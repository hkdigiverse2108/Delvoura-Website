import { Form } from "antd";
import { useMemo, useState } from "react";
import { CommonEmailInput, CommonPhoneInput, CommonTextArea, CommonTextInput } from "../../Attribute";
import { EnvironmentOutlined, MailOutlined, PhoneOutlined, GlobalOutlined } from "@ant-design/icons";

const ContactForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [message, setMessage] = useState("");

  const countryOptions = useMemo(
    () => [
      { value: "+91", label: "IN (+91)" },
      { value: "+1", label: "US (+1)" },
      { value: "+44", label: "UK (+44)" },
      { value: "+971", label: "UAE (+971)" },
      { value: "+61", label: "AU (+61)" },
    ],
    []
  );

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
                <p className="mt-1 leading-6">501, Delvoura House, MG Road, Bengaluru, Karnataka 560001</p>
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
                <p className="mt-1">support@delvoura.com</p>
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
                <p className="mt-1">+91 90000 00000</p>
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
                <p className="mt-1">www.delvoura.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="delvoura-contact-content rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-5 shadow-[0_16px_40px_-34px_color-mix(in_srgb,var(--color-primary)_35%,transparent)] md:p-7">
          <Form className="grid gap-3 md:gap-4">
            <CommonTextInput name="fullName" label="Full Name" placeholder="Your full name" value={fullName} onChange={(event) => setFullName(event.target.value)} onBlur={() => {}} error={undefined} touched={false} />
            <CommonEmailInput name="email" label="Email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} onBlur={() => {}} error={undefined} touched={false} />
            <CommonPhoneInput name="phone" label="Phone Number" placeholder="Enter phone number" value={phone} onChange={(event) => setPhone(event.target.value)} onBlur={() => {}} error={undefined} touched={false} countryValue={countryCode} onCountryChange={(value) => setCountryCode(value)} countryOptions={countryOptions} />
            <CommonTextArea name="message" label="Message" placeholder="Tell us how we can help" value={message} onChange={(event) => setMessage(event.target.value)} onBlur={() => {}} error={undefined} touched={false} rows={5} />
            <button type="button" className="mt-2 w-full rounded-sm bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--color-text-on-dark)] transition hover:bg-[color:var(--color-accent)]" >
              <span className="text-white">Send Message</span> 
            </button>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
