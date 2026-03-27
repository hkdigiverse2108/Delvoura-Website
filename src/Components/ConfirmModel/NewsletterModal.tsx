import { CloseOutlined } from "@ant-design/icons";
import { Modal, Typography } from "antd";
import { Form as FormikForm, Formik, type FormikHelpers } from "formik";
import { CommonEmailInput, notifyError, notifySuccess } from "../../Attribute";
import { Mutations } from "../../Api";
import type { CreateNewsletterPayload } from "../../Types";
import { NewsletterSchema } from "../../Utils/ValidationSchemas";

type NewsletterModalProps = {
  open: boolean;
  onClose: () => void;
};

const { Title, Text } = Typography;

const NewsletterModal = ({ open, onClose }: NewsletterModalProps) => {
  const { mutate: createNewsletter, isPending } = Mutations.useCreateNewsletter();

  const handleSubmit = (values: CreateNewsletterPayload, helpers: FormikHelpers<CreateNewsletterPayload>) => {
    createNewsletter(
      { email: values.email.toLowerCase().trim() },
      {
        onSuccess: () => {
          notifySuccess("Subscribed successfully");
          helpers.resetForm({ values: { email: "" } });
          helpers.setTouched({});
          helpers.setStatus(undefined);
          onClose();
        },
        onError: (err) => {
          const message = err instanceof Error ? err.message : "Something went wrong";
          notifyError(message);
          helpers.setStatus(message);
        },
      }
    );
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered closable={false} keyboard={false} width={560} maskClosable={false} maskStyle={{ backdropFilter: "blur(6px)", backgroundColor: "color-mix(in srgb, var(--color-text) 35%, transparent)", }} bodyStyle={{ padding: 0, background: "var(--color-card)" }} className="delvoura-newsletter-modal" >
      <div className="relative flex flex-col items-center rounded-[20px] border px-8 py-10 text-center" style={{ background: "linear-gradient(180deg, var(--color-card), var(--color-bg))", boxShadow: "var(--shadow-soft)", }} >
        <button type="button" onClick={onClose} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border bg-[color:var(--color-card)] text-[color:var(--color-text)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]" aria-label="Close" >
          <CloseOutlined className="text-lg leading-none" />
        </button>

        <img src="/assets/images/logo/logo-black.png" alt="Delvoura" className="mb-6 h-10 w-auto" />

        <Title level={3} className="!mb-2 !mt-0 !text-[color:var(--color-text)]">
          Don't Miss Out
        </Title>
        <Text className="max-w-sm text-sm" style={{ color: "var(--color-text-muted)" }}>
          Subscribe for exclusive offers, new fragrance launches, and curated scent stories delivered to your inbox.
        </Text>

        <div className="mt-8 w-full max-w-md">
          <Formik<CreateNewsletterPayload> initialValues={{ email: "" }} validationSchema={NewsletterSchema} onSubmit={handleSubmit}>
            {({ values, errors, touched, status, handleChange, handleBlur, handleSubmit }) => (
              <FormikForm onSubmit={handleSubmit}>
                <CommonEmailInput  name="email"  label="Email"  placeholder="Enter your email address"  value={values.email}  onChange={handleChange}  onBlur={handleBlur}  error={touched.email ? errors.email : undefined}  touched={!!touched.email}  hideLabel  inputClassName="h-12 rounded-full !border !border-[color:var(--color-border)] !bg-[color:var(--color-card)] !pl-5 !pr-5 !text-sm !text-[color:var(--color-text)] shadow-[0_16px_30px_-24px_rgba(15,23,42,0.35)] hover:!border-[#ff4d4f] focus:!border-[#ff4d4f] focus:!shadow-none" /> <br />
                {status ? <div className="mt-2 text-sm text-red-500">{status}</div> : null}
                <button type="submit" disabled={isPending || !values.email.trim()} className="mt-6 h-11 w-full rounded-[15px] border border-[color:var(--color-accent)] bg-[color:var(--color-accent)] text-sm font-semibold text-[color:var(--color-text-on-dark)] shadow-[0_18px_32px_-24px_rgba(15,23,42,0.55)] transition hover:translate-y-[-1px] hover:bg-[color:var(--color-accent)] hover:shadow-[0_20px_34px_-24px_rgba(15,23,42,0.7)] disabled:cursor-not-allowed disabled:opacity-60" style={{color:"white"}}>
                  {isPending ? "Subscribing..." : "Subscribe"}
                </button>
              </FormikForm>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export default NewsletterModal;
