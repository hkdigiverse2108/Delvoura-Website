import { CloseOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";
import type { LogoutConfirmModelProps } from "../../Types";

const { Title, Text } = Typography;

 const LogoutConfirmModel = ({ open, onConfirm, onCancel, confirmLoading = false,}: LogoutConfirmModelProps) => {
  return (
    <Modal open={open} onCancel={onCancel} footer={null} centered closable={false} width={520} maskClosable={!confirmLoading} maskStyle={{ backdropFilter: "blur(6px)", backgroundColor: "color-mix(in srgb, var(--color-text) 35%, transparent)",}} bodyStyle={{ padding: 0, background: "var(--color-card)" }} style={{ background: "var(--color-card)" }} className="delvoura-logout-confirm-modal">
      <div className="relative flex flex-col items-center rounded-[28px] border border-[color:var(--color-border)] px-8 py-9 text-center" style={{ background: "linear-gradient(180deg, var(--color-card), var(--color-bg))", boxShadow: "var(--shadow-soft)",}}>
        <button type="button" onClick={onCancel} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] text-[color:var(--color-text)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]" aria-label="Close">
          <CloseOutlined className="text-lg leading-none" style={{ color: "var(--color-text)" }} />
        </button>
        <span className="mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-[color:var(--color-border)] text-[color:var(--color-accent)]" style={{ background: "radial-gradient(circle_at_30%_30%, color-mix(in srgb, var(--color-accent) 12%, transparent), var(--color-bg))", boxShadow: "0 16px 36px -26px color-mix(in srgb, var(--color-accent) 65%, transparent)",}}>
          <LogoutOutlined className="text-3xl" />
        </span>
        <Title level={4} className="!mb-2 !mt-0 !text-[color:var(--color-text)]">
          Confirm logout
        </Title>
        <Text style={{ color: "var(--color-text-muted)" }}>
          Are you sure you want to sign out? You can sign back in anytime.
        </Text>

        <div className="mt-6 flex w-full items-center justify-center gap-3">
          <Button onClick={onCancel} className="h-11 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)] px-7 text-[color:var(--color-text)] hover:!border-[color:var(--color-accent)] hover:!text-[color:var(--color-accent)]" disabled={confirmLoading}>
            Cancel
          </Button>
          <Button type="primary" danger onClick={onConfirm} loading={confirmLoading} className="h-11 rounded-xl border border-[color:var(--color-accent)] bg-[linear-gradient(135deg,var(--color-accent),var(--color-soft-accent))] px-7 text-[color:var(--color-text-on-dark)] hover:!bg-[linear-gradient(135deg,var(--color-soft-accent),var(--color-accent))]">
            Logout
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutConfirmModel
