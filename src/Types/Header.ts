export type ProfileCardProps = {
  variant?: "desktop" | "mobile";
  user?: unknown | null;
  userData?: unknown;
  onNavigate?: () => void;
};

export type LogoutConfirmModelProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
};

export type SearchBarWithModalProps = {
  buttonClassName?: string;
  showOnMobile?: boolean;
  buttonText?: string;
};
