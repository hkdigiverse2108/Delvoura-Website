import { CloseOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";
import type { LogoutConfirmModelProps } from "../../Types";

const { Title, Text } = Typography;

export const LogoutConfirmModel = ({ open, onConfirm, onCancel, confirmLoading = false,}: LogoutConfirmModelProps) => {
  return (
    <Modal open={open} onCancel={onCancel} footer={null} centered closable={false} width={520} maskClosable={!confirmLoading} maskStyle={{ backdropFilter: "blur(6px)", backgroundColor: "rgba(10,10,10,0.45)",}} bodyStyle={{ padding: 0, background: "transparent" }} style={{ background: "transparent" }} className="delvoura-logout-confirm-modal">
      <div className="relative flex flex-col items-center rounded-[28px] border border-[rgba(214,176,118,0.45)] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),rgba(18,13,22,0.98)),linear-gradient(180deg,#1b1423,#120d16)] px-8 py-9 text-center shadow-[0_28px_70px_-30px_rgba(0,0,0,0.9)]">
        <button type="button" onClick={onCancel} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-[rgba(214,176,118,0.5)] bg-[#1a1322] text-[#ffffff] transition hover:border-[rgba(214,176,118,0.75)] hover:text-white" aria-label="Close">
          <CloseOutlined className="text-lg leading-none text-white" style={{ color: "#ffffff" }} />
        </button>
        <span className="mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-[rgba(214,176,118,0.55)] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),rgba(15,10,20,0.9))] text-[#d6b076] shadow-[0_18px_40px_-20px_rgba(214,176,118,0.8)]">
          <LogoutOutlined className="text-3xl" />
        </span>
        <Title level={4} className="!mb-2 !mt-0 !text-[#f9f2e9]">
          Confirm logout
        </Title>
        <Text style={{ color: "rgba(247,239,231,0.95)", textShadow: "0 1px 10px rgba(0,0,0,0.35)", }}>
          Are you sure you want to sign out? You can sign back in anytime.
        </Text>

        <div className="mt-6 flex w-full items-center justify-center gap-3">
          <Button onClick={onCancel} className="h-11 rounded-xl border border-[rgba(214,176,118,0.35)] bg-transparent px-7 text-[#f7efe7] hover:!border-[rgba(214,176,118,0.6)] hover:!text-[#f7efe7]" disabled={confirmLoading}>
            Cancel
          </Button>
          <Button type="primary" danger onClick={onConfirm} loading={confirmLoading} className="h-11 rounded-xl border border-[rgba(214,176,118,0.45)] bg-[linear-gradient(135deg,#c99555,#a66a2c)] px-7 text-[#1a121f] hover:!bg-[linear-gradient(135deg,#d8a665,#b67935)]">
            Logout
          </Button>
        </div>
      </div>
      <style>
        {`
          .delvoura-logout-confirm-modal.ant-modal .ant-modal-content,
          .delvoura-logout-confirm-modal .ant-modal-content {
            background: transparent !important;
            box-shadow: none !important;
            padding: 0 !important;
            border-radius: 28px !important;
            overflow: hidden !important;
          }
          .delvoura-logout-confirm-modal.ant-modal .ant-modal-body,
          .delvoura-logout-confirm-modal .ant-modal-body {
            padding: 0 !important;
            background: transparent !important;
          }
        `}
      </style>
    </Modal>
  );
};
