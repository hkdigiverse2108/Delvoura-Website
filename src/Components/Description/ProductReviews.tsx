import { Input, Modal, Rate, Spin } from "antd";
import { Form, Formik, type FormikHelpers } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { Mutations, Queries } from "../../Api";
import { CommonEmailInput, CommonTextInput, notifyError, notifySuccess } from "../../Attribute";
import { FilterOutlined } from "@ant-design/icons";
import type { CreateRatingPayload, ProductReviewsProps, RatingItem } from "../../Types";
import { ProductReviewSchema } from "../../Utils/ValidationSchemas";
import { KEYS } from "../../Constants";


const ProductReviews = ({ productId, ratingSummary }: ProductReviewsProps) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [writeOpen, setWriteOpen] = useState(false);
  const [writeStep, setWriteStep] = useState(0);
  const [writeDirection, setWriteDirection] = useState<"next" | "back">("next");
  const [formVersion, setFormVersion] = useState(0);
  const [reviewSort, setReviewSort] = useState("Featured");
  const [sortOpen, setSortOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading } = Queries.useGetRatings(productId ? { productId } : undefined);
  const { mutate: createRating, isPending: isCreating } = Mutations.useCreateRating({invalidateQueryKeys: [[KEYS.RATING.GET_RATINGS]],});

  const reviews = useMemo<RatingItem[]>(() => data?.data?.rating_data ?? [], [data]);

  const sortedReviews = useMemo(() => {
    const cloned = [...reviews];
    const ratingValue = (value?: number) => (typeof value === "number" && Number.isFinite(value) ? value : 0);
    const dateValue = (value?: string) => {
      if (!value) return 0;
      const parsed = Date.parse(value);
      return Number.isFinite(parsed) ? parsed : 0;
    };

    switch (reviewSort) {
      case "Highest Ratings": return cloned.sort((a, b) => ratingValue(b.starRating) - ratingValue(a.starRating));
      case "Lowest Ratings": return cloned.sort((a, b) => ratingValue(a.starRating) - ratingValue(b.starRating));
      case "Newest": return cloned.sort((a, b) => dateValue(b.createdAt) - dateValue(a.createdAt));
      case "Featured": default:
      return cloned;
    }
  }, [reviews, reviewSort]);

  const activeReview = sortedReviews[activeIndex];

  const ratingCount = ratingSummary?.ratingCount ?? sortedReviews.length;
  const avgRating = useMemo(() => {
    if (typeof ratingSummary?.avgRating === "number") return ratingSummary.avgRating;
    if (!sortedReviews.length) return 0;
    const total = sortedReviews.reduce((sum, review) => sum + (review.starRating || 0), 0);
    return Number((total / sortedReviews.length).toFixed(2));
  }, [ratingSummary?.avgRating, sortedReviews]);

  useEffect(() => {
    setActiveIndex(0);
  }, [sortedReviews.length, reviewSort, productId]);

  useEffect(() => {
    if (!sortOpen) return;
    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target || !sortMenuRef.current) return;
      if (!sortMenuRef.current.contains(target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [sortOpen]);

  const formatDate = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString();
  };

  type ReviewFormValues = Omit<CreateRatingPayload, "productId">;

  const handleSubmit = (values: ReviewFormValues, helpers: FormikHelpers<ReviewFormValues>) => {
    if (!productId) {
      notifyError("Product not found");
      return;
    }
    createRating(
      { ...values, productId, email: values.email.toLowerCase() },
      {
        onSuccess: () => {
          notifySuccess("Review submitted successfully");
          helpers.resetForm();
          setWriteOpen(false);
          setWriteStep(0);
          setWriteDirection("next");
          setFormVersion((version) => version + 1);
        },
        onError: (err) => {
          const message = err instanceof Error ? err.message : "Something went wrong";
          notifyError(message);
        },
      }
    );
  };

  return (
    <section className="delvoura-review-section">
      <div className="delvoura-review-card">
        <div className="delvoura-review-header">
          <div className="delvoura-review-rating">
            <Rate disabled value={avgRating} />
            <span className="delvoura-review-count">{ratingCount} Review{ratingCount === 1 ? "" : "s"}</span>
          </div>

          <div className="delvoura-review-actions">
            <button type="button" className="delvoura-review-btn" disabled={!productId} onClick={() => { setWriteStep(0); setWriteDirection("next"); setWriteOpen(true); }} >
              Write a review
            </button>
            <div className="delvoura-sort-wrap" ref={sortMenuRef}>
              <button type="button" className={`delvoura-sort-btn ${sortOpen ? "is-open" : ""}`} onClick={() => setSortOpen((openValue) => !openValue)} aria-haspopup="menu" aria-expanded={sortOpen} >
                <FilterOutlined />
              </button>
              {sortOpen ? (
                <div className="delvoura-sort-menu" role="menu">
                  <div className="delvoura-sort-title">Sort by</div>
                  {["Featured", "Newest", "Highest Ratings", "Lowest Ratings"].map((option) => (
                    <button key={option} type="button" className={`delvoura-sort-option ${reviewSort === option ? "is-active" : ""}`} onClick={() => { setReviewSort(option); setSortOpen(false); }}role="menuitem">
                      {option}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className={`delvoura-review-list ${!isLoading && sortedReviews.length === 0 ? "is-empty" : ""}`}>
          {isLoading ? (
            <div className="py-6 flex items-center justify-center">
              <Spin />
            </div>
          ) : null}
          {!isLoading && sortedReviews.length === 0 ? (
            <div className="delvoura-review-empty py-10 text-center text-sm text-[color:var(--color-text-muted)] flex flex-col items-center gap-2">
              <img src="/assets/images/order/empty.png" alt="No reviews" className="w-40 opacity-80" />
              <div>No reviews yet</div>
            </div>
          ) : null}
          {!isLoading && sortedReviews.map((review, index) => {
            const name = `${review.firstName || ""} ${review.lastName || ""}`.trim() || "Anonymous";
            return (
              <article key={`${review._id || name}-${index}`} className="delvoura-review-item" onClick={() => { setActiveIndex(index); setOpen(true); }} role="button" tabIndex={0} onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setActiveIndex(index);
                    setOpen(true);
                  }
                }}
              >
                <div className="delvoura-review-meta">
                  <div className="delvoura-review-name">{name}</div>
                  <span className="delvoura-review-date">{formatDate(review.createdAt)}</span>
                </div>
                <Rate disabled value={review.starRating || 0} className="delvoura-review-stars" />
                <p className="delvoura-review-text">{review.description || ""}</p>
              </article>
            );
          })}
        </div>
      </div>

      <Modal open={writeOpen} onCancel={() => { setWriteOpen(false); setWriteStep(0); setWriteDirection("next"); setFormVersion((version) => version + 1); }} footer={null} className="delvoura-write-modal" centered width={820} >
        <Formik<ReviewFormValues> key={formVersion} initialValues={{ starRating: 0, description: "", firstName: "", lastName: "", email: "" }} validationSchema={ProductReviewSchema} onSubmit={handleSubmit} >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, validateForm, setTouched, submitForm }) => {
            const descriptionError = touched.description && typeof errors.description === "string" ? errors.description : undefined;
            const firstNameError = touched.firstName && typeof errors.firstName === "string" ? errors.firstName : undefined;
            const lastNameError = touched.lastName && typeof errors.lastName === "string" ? errors.lastName : undefined;
            const emailError = touched.email && typeof errors.email === "string" ? errors.email : undefined;

            const handleNext = async () => {
              const stepFields = writeStep === 0 ? ["starRating"] : writeStep === 1 ? ["description"] : ["firstName", "lastName", "email"];

              const formErrors = await validateForm();
              const hasErrors = stepFields.some((field) => formErrors[field as keyof typeof formErrors]);
              if (hasErrors) {
                const touchedMap = stepFields.reduce<Record<string, boolean>>((acc, field) => {
                  acc[field] = true;
                  return acc;
                }, {});
                setTouched(touchedMap, true);
                return;
              }

              if (writeStep >= 2) {
                submitForm();
                return;
              }

              setWriteDirection("next");
              setWriteStep((step) => Math.min(2, step + 1));
            };

            return (
              <Form>
                <div className={`delvoura-write-inner ${writeDirection === "next" ? "is-next" : "is-back"}`}>
                  <div key={writeStep} className={`delvoura-write-step ${writeStep === 2 ? "is-form" : ""}`}>
                    {writeStep === 0 ? (
                      <>
                        <h3 className="delvoura-write-title">How would you rate this item?</h3>
                        <div className="delvoura-write-rating">
                          <Rate  value={values.starRating}  onChange={(value) => {  setFieldValue("starRating", value);  if (value && value >= 1) {  setWriteDirection("next");  setWriteStep(1);   }  }}  />
                          <div className="delvoura-write-rating-labels">
                            <span>Dislike it</span>
                            <span>Love it!</span>
                          </div>
                        </div>
                      </>
                    ) : null}

                    {writeStep === 1 ? (
                      <>
                        <h3 className="delvoura-write-title">Tell us more!</h3>
                        <Input.TextArea className="delvoura-write-textarea" name="description" placeholder="Share your experience" value={values.description} onChange={handleChange} onBlur={handleBlur} />
                        {descriptionError ? <span className="mt-2 block text-sm text-red-500">{descriptionError}</span> : null}
                      </>
                    ) : null}

                    {writeStep === 2 ? (
                      <>
                        <h3 className="delvoura-write-title">About you</h3>
                        <div className="delvoura-write-form">
                          <div className="delvoura-write-grid">
                            <CommonTextInput name="firstName" label="First name *" placeholder="First name" value={values.firstName} onChange={handleChange} onBlur={handleBlur} error={firstNameError} touched={!!touched.firstName} />
                            <CommonTextInput name="lastName" label="Last name *" placeholder="Last name" value={values.lastName} onChange={handleChange} onBlur={handleBlur} error={lastNameError} touched={!!touched.lastName} />
                          </div>
                          <div className="delvoura-write-single">
                            <CommonEmailInput name="email" label="Email *" value={values.email} onChange={handleChange} onBlur={handleBlur} error={emailError} touched={!!touched.email} />
                          </div>
                          <p className="delvoura-write-note">
                            By submitting, I acknowledge the Terms of Service and Privacy Policy and that my review will be
                            publicly posted and shared online
                          </p>
                        </div>
                      </>
                    ) : null}
                  </div>

                  <div className="delvoura-write-footer">
                    {writeStep > 0 ? (
                      <button type="button" className="delvoura-write-back" onClick={() => {
                          if (writeStep === 0) {
                            setWriteOpen(false);
                            setWriteStep(0);
                            setWriteDirection("next");
                            setFormVersion((version) => version + 1);
                          } else {
                            setWriteDirection("back");
                            setWriteStep((step) => Math.max(0, step - 1));
                          }
                        }}
                      >
                        Back
                      </button>
                    ) : (
                      <span />
                    )}
                    <div className="delvoura-write-steps">
                      {[0, 1, 2].map((step) => (
                        <span key={step} className={`delvoura-write-step-dot ${writeStep >= step ? "is-active" : ""}`} />
                      ))}
                    </div>
                    {writeStep > 0 ? (
                      <button type="button" className="delvoura-write-next" onClick={handleNext} disabled={isCreating}>
                        {writeStep >= 2 ? (isCreating ? "Submitting..." : "Submit") : "Next"}
                      </button>
                    ) : (
                      <span />
                    )}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>

      <Modal open={open} onCancel={() => setOpen(false)} footer={null} className="delvoura-review-modal" centered>
        {activeReview ? (
          <article className="delvoura-review-modal-body">
            <div className="delvoura-review-meta">
              <div className="delvoura-review-name">{`${activeReview.firstName || ""} ${activeReview.lastName || ""}`.trim() || "Anonymous"}</div>
              <span className="delvoura-review-date">{formatDate(activeReview.createdAt)}</span>
            </div>
            <Rate disabled value={activeReview.starRating || 0} className="delvoura-review-stars" />
            <p className="delvoura-review-text">{activeReview.description || ""}</p>
          </article>
        ) : null}
      </Modal>
    </section>
  );
};

export default ProductReviews;
