import { Form, Input, Modal, Rate, Select } from "antd";
import { useMemo, useState } from "react";
import { CommonEmailInput, CommonTextInput } from "../../Attribute";

const ProductReviews = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [writeOpen, setWriteOpen] = useState(false);
  const [writeStep, setWriteStep] = useState(0);
  const [writeDirection, setWriteDirection] = useState<"next" | "back">("next");
  const [writeRating, setWriteRating] = useState(0);
  const [writeText, setWriteText] = useState("");
  const [writeFirstName, setWriteFirstName] = useState("");
  const [writeLastName, setWriteLastName] = useState("");
  const [writeEmail, setWriteEmail] = useState("");

  const reviews = useMemo(
    () => [
      {
        name: "Nitish P.",
        verified: true,
        date: "3/17/2026",
        rating: 5,
        text:
          "Good quality and fragrance. Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nesciunt, voluptates vel aliquid reprehenderit illum! Quisquam sequi repudiandae laborum vel iusto corrupti maxime, ad laboriosam distinctio explicabo iste vero veniam.",
      },
    ],
    []
  );

  const activeReview = reviews[activeIndex];

  return (
    <section className="delvoura-review-section">
      <div className="delvoura-review-card">
        <div className="delvoura-review-header">
          <div className="delvoura-review-rating">
            <Rate disabled defaultValue={5} />
            <span className="delvoura-review-count">1 Review</span>
          </div>

          <div className="delvoura-review-actions">
            <button type="button" className="delvoura-review-btn" onClick={() => { setWriteStep(0); setWriteDirection("next"); setWriteOpen(true); }} >
              Write a review
            </button>
            <div className="delvoura-review-select-wrap">
              <Select className="delvoura-review-select" dropdownClassName="delvoura-review-dropdown" defaultValue="Featured" options={[ { value: "Featured", label: "Featured" }, { value: "Newest", label: "Newest" }, { value: "Highest Ratings", label: "Highest Ratings" }, { value: "Lowest Ratings", label: "Lowest Ratings" }, ]} />
            </div>
          </div>
        </div>

        <div className="delvoura-review-list">
          {reviews.map((review, index) => (
            <article key={`${review.name}-${index}`} className="delvoura-review-item" onClick={() => { setActiveIndex(index); setOpen(true); }} role="button" tabIndex={0} onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setActiveIndex(index);
                  setOpen(true);
                }
              }}
            >
              <div className="delvoura-review-meta">
                <div className="delvoura-review-name">{review.name}</div>
                {review.verified ? (
                  <span className="delvoura-review-verified">Verified</span>
                ) : null}
                <span className="delvoura-review-date">{review.date}</span>
              </div>
              <Rate disabled defaultValue={review.rating} className="delvoura-review-stars" />
              <p className="delvoura-review-text">{review.text}</p>
            </article>
          ))}
        </div>
      </div>

      <Modal open={writeOpen} onCancel={() => setWriteOpen(false)} footer={null} className="delvoura-write-modal" centered width={820} >
        <div className={`delvoura-write-inner ${writeDirection === "next" ? "is-next" : "is-back"}`}>
          <div key={writeStep} className={`delvoura-write-step ${writeStep === 2 ? "is-form" : ""}`}>
            {writeStep === 0 ? (
              <>
                <h3 className="delvoura-write-title">How would you rate this item?</h3>
                <div className="delvoura-write-rating">
                  <Rate value={writeRating} onChange={setWriteRating} />
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
                <Input.TextArea className="delvoura-write-textarea" placeholder="Share your experience" value={writeText} onChange={(event) => setWriteText(event.target.value)}/>
              </>
            ) : null}

            {writeStep === 2 ? (
              <>
                <h3 className="delvoura-write-title">About you</h3>
                <Form className="delvoura-write-form">
                  <div className="delvoura-write-grid">
                    <CommonTextInput name="firstName" label="First name *" placeholder="First name" value={writeFirstName} onChange={(event) => setWriteFirstName(event.target.value)} onBlur={() => {}} error={undefined} touched={false} />
                    <CommonTextInput name="lastName" label="Last name" placeholder="Last name" value={writeLastName} onChange={(event) => setWriteLastName(event.target.value)} onBlur={() => {}} error={undefined} touched={false} />
                  </div>
                  <div className="delvoura-write-single">
                    <CommonEmailInput name="email" label="Email *" value={writeEmail} onChange={(event) => setWriteEmail(event.target.value)} onBlur={() => {}} error={undefined} touched={false} />
                  </div>
                  <p className="delvoura-write-note">
                    By submitting, I acknowledge the Terms of Service and Privacy Policy and that my review will be
                    publicly posted and shared online
                  </p>
                </Form>
              </>
            ) : null}
          </div>

          <div className="delvoura-write-footer">
            <button type="button" className="delvoura-write-back" onClick={() => {
                if (writeStep === 0) {
                  setWriteOpen(false);
                } else {
                  setWriteDirection("back");
                  setWriteStep((step) => Math.max(0, step - 1));
                }
              }}
            >
              Back
            </button>
            <div className="delvoura-write-steps">
              {[0, 1, 2].map((step) => (
                <span key={step} className={`delvoura-write-step-dot ${writeStep >= step ? "is-active" : ""}`} />
              ))}
            </div>
            <button type="button" className="delvoura-write-next" onClick={() => {
                if (writeStep >= 2) {
                  setWriteOpen(false);
                } else {
                  setWriteDirection("next");
                  setWriteStep((step) => Math.min(2, step + 1));
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={open} onCancel={() => setOpen(false)} footer={null} className="delvoura-review-modal" centered>
        {activeReview ? (
          <article className="delvoura-review-modal-body">
            <div className="delvoura-review-meta">
              <div className="delvoura-review-name">{activeReview.name}</div>
              {activeReview.verified ? (
                <span className="delvoura-review-verified">Verified</span>
              ) : null}
              <span className="delvoura-review-date">{activeReview.date}</span>
            </div>
            <Rate disabled defaultValue={activeReview.rating} className="delvoura-review-stars" />
            <p className="delvoura-review-text">{activeReview.text}</p>
          </article>
        ) : null}
      </Modal>
    </section>
  );
};

export default ProductReviews;
