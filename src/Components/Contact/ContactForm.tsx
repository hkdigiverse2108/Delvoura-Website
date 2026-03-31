import { AnimatePresence, motion } from "framer-motion";
import { Form as FormikForm, Formik, type FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { CommonEmailInput, CommonPhoneInput, CommonTextArea, CommonTextInput } from "../../Attribute";
import { EnvironmentOutlined, MailOutlined, PhoneOutlined, GlobalOutlined } from "@ant-design/icons";
import { Mutations } from "../../Api";
import type { ContactUsPayload } from "../../Types";
import { useSettings } from "../../Utils/Hooks";
import { ContactUsSchema } from "../../Utils/ValidationSchemas";

const ContactForm = () => {
  const [success, setSuccess] = useState(false);
  const [formVersion, setFormVersion] = useState(0);
  const { mutate: contactUs, isPending } = Mutations.useContactUs();
  const { storeInfo } = useSettings();

  const addressText = storeInfo.address || "-";
  const emailText = storeInfo.email || "-";
  const phoneText = storeInfo.phoneNumber || "-";
  const websiteText = storeInfo.website || "-";

  useEffect(() => {
    if (!success) return;
    const timer = window.setTimeout(() => setSuccess(false), 5000);
    return () => window.clearTimeout(timer);
  }, [success]);

  const handleSubmit = (values: ContactUsPayload, helpers: FormikHelpers<ContactUsPayload>) => {
    contactUs(
      { ...values, email: values.email.toLowerCase().trim() },
      {
        onSuccess: () => {
          helpers.resetForm({
            values: { fullName: "", email: "", countryCode: "+91", phone: "", message: "" },
          });
          helpers.setTouched({});
          helpers.setStatus(undefined);
          setFormVersion((v) => v + 1);
          setSuccess(true);
        },
        onError: (err) => {
          const message = err instanceof Error ? err.message : "Something went wrong";
          helpers.setStatus(message);
        },
      }
    );
  };

  return (
    <section className="delvoura-container py-10 md:py-12">
      <div className="grid gap-26 rounded-2x  md:grid-cols-[0.9fr_1.5fr]">
        <div className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-text-muted)]">
              Contact Us
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[color:var(--color-text)] md:text-3xl">
              Delvoura 
            </h2>
          </div>
{/* 
          <p className="text-base leading-7 text-[color:var(--color-text-muted)]">
            We would love to hear from you. Reach out for collaborations, orders, or
            anything fragrance-related.
          </p> */}

          <div className="space-y-4 text-sm text-[color:var(--color-text)]">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-card)] text-[color:var(--color-accent)]">
                <EnvironmentOutlined />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-text-muted)]">
                  Address
                </p>
                <p className="mt-1 leading-6">{addressText}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-card)] text-[color:var(--color-accent)]">
                <MailOutlined />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-text-muted)]">
                  Email
                </p>
                <p className="mt-1">{emailText}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-card)] text-[color:var(--color-accent)]">
                <PhoneOutlined />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-text-muted)]">
                  Phone
                </p>
                <p className="mt-1">{phoneText}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-card)] text-[color:var(--color-accent)]">
                <GlobalOutlined />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-text-muted)]">
                  Website
                </p>
                <p className="mt-1">{storeInfo.websiteHref ? (<a href={storeInfo.websiteHref} target="_blank" rel="noopener noreferrer">{websiteText}</a>) : websiteText}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="delvoura-contact-content relative rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-5 shadow-[0_16px_40px_-34px_color-mix(in_srgb,var(--color-primary)_35%,transparent)] md:p-7">
          <AnimatePresence>
            {success ? (
              <motion.div className="delvoura-contact-success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div className="delvoura-contact-success-card" initial={{ scale: 0.9, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 6 }} transition={{ duration: 0.35, ease: "easeOut" }} >
                  <motion.svg viewBox="0 0 52 52" className="delvoura-contact-check" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.35, ease: "easeOut" }} >
                    <motion.circle cx="26" cy="26" r="24" className="delvoura-contact-check-ring" />
                    <motion.path d="M16 27.2l6.4 6.1L36 20" className="delvoura-contact-check-mark" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.55, ease: "easeInOut", delay: 0.1 }} />
                  </motion.svg>
                  <h3>Message sent</h3>
                  <p>We will get back to you shortly.</p>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
          <Formik<ContactUsPayload> key={formVersion} initialValues={{ fullName: "", email: "", countryCode: "+91", phone: "", message: "" }} validationSchema={ContactUsSchema} onSubmit={handleSubmit}>
            {({ values, errors, touched, status, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
              <FormikForm className={`grid gap-3 md:gap-4 ${success ? "is-hidden" : ""}`} onSubmit={handleSubmit}>
                <CommonTextInput name="fullName" label="Full Name" placeholder="Your full name" value={values.fullName} onChange={handleChange} onBlur={handleBlur} error={touched.fullName ? errors.fullName : undefined} touched={!!touched.fullName} />
                <CommonEmailInput name="email" label="Email" placeholder="you@example.com" value={values.email} onChange={handleChange} onBlur={handleBlur} error={touched.email ? errors.email : undefined} touched={!!touched.email} />
                <CommonPhoneInput name="phone" label="Phone Number" placeholder="Enter phone number" value={values.phone} onChange={handleChange} onBlur={handleBlur} error={touched.phone ? errors.phone : undefined} touched={!!touched.phone} countryValue={values.countryCode} onCountryChange={(value: string) => setFieldValue("countryCode", value)} />
                <CommonTextArea name="message" label="Message" placeholder="Tell us how we can help" value={values.message} onChange={handleChange} onBlur={handleBlur} error={touched.message ? errors.message : undefined} touched={!!touched.message} rows={5} />
                {status ? <div className="text-sm text-red-500">{status}</div> : null}
                <button type="submit" disabled={isPending} className="mt-2 w-full rounded-sm bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--color-text-on-dark)] transition hover:bg-[color:var(--color-accent)] disabled:opacity-60" >
                  <span className="text-white">{isPending ? "Sending..." : "Send Message"}</span>
                </button>
              </FormikForm>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
