import { CloseOutlined } from "@ant-design/icons";
import { Input, Modal, Typography } from "antd";
import { useMemo, useState } from "react";

type NewsletterModalProps = {
  open: boolean;
  onClose: () => void;
};

const { Title, Text } = Typography;

const NewsletterModal = ({ open, onClose }: NewsletterModalProps) => {
  const [email, setEmail] = useState("");

  const isDisabled = useMemo(() => email.trim().length === 0, [email]);

  const handleSubmit = () => {
    if (isDisabled) return;
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered closable={false} keyboard={false} width={560} maskClosable={false} maskStyle={{  backdropFilter: "blur(6px)",  backgroundColor:  "color-mix(in srgb, var(--color-text) 35%, transparent)", }}bodyStyle={{ padding: 0, background: "var(--color-card)" }}className="delvoura-newsletter-modal"  >
      <div className="relative flex flex-col items-center rounded-[20px] border border-[color:var(--color-border)] px-8 py-10 text-center" style={{ background: "linear-gradient(180deg, var(--color-card), var(--color-bg))", boxShadow: "var(--shadow-soft)",}}  >
        <button type="button" onClick={onClose} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] text-[color:var(--color-text)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]" aria-label="Close" >
          <CloseOutlined className="text-lg leading-none" />
        </button>

        <img  src="/assets/images/logo/logo-black.png"  alt="Delvoura"  className="mb-6 h-10 w-auto"/>

        <Title level={3} className="!mb-2 !mt-0 !text-[color:var(--color-text)]">
          Don't Miss Out
        </Title>
        <Text className="max-w-sm text-sm" style={{ color: "var(--color-text-muted)" }}>
          Subscribe for exclusive offers, new fragrance launches, and curated scent stories
          delivered to your inbox.
        </Text>

        <div className="mt-8 w-full max-w-md">
          <Input  size="large"  value={email}  onChange={(event) => setEmail(event.target.value)}  onPressEnter={handleSubmit}  placeholder="Enter your email address"  className="h-12 rounded-full !border-[color:var(--color-border)] !bg-[color:var(--color-card)] !pl-5 !pr-5 !text-sm !text-[color:var(--color-text)] shadow-[0_16px_30px_-24px_rgba(15,23,42,0.35)]" /> <br /><br />
          <button type="button" onClick={handleSubmit} disabled={isDisabled} className="mt-3  h-11 w-full  rounded-[15px] border border-[color:var(--color-accent)] bg-[color:var(--color-accent)] text-sm font-semibold text-[color:var(--color-text-on-dark)] shadow-[0_18px_32px_-24px_rgba(15,23,42,0.55)] transition hover:translate-y-[-1px] hover:bg-[color:var(--color-accent)] hover:shadow-[0_20px_34px_-24px_rgba(15,23,42,0.7)] disabled:cursor-not-allowed disabled:opacity-60" >
            Subscribe
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewsletterModal;
