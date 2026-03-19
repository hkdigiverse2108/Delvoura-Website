export type ProfileCardProps = {
  variant?: "desktop" | "mobile";
  user?: unknown | null;
  userData?: unknown;
};

export type LogoutConfirmModelProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
};