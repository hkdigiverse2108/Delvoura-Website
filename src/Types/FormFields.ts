import type React from "react";

export type CommonEmailInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  touched?: boolean;
  hideLabel?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
};

export type CommonPasswordInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  touched?: boolean;
};

export type CommonTextInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  touched?: boolean;
};

export type CommonPinCodeInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  touched?: boolean;
};

export type CommonCountrySelectProps = {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  error?: string;
  touched?: boolean;
};

export type CommonPhoneInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  touched?: boolean;
  countryValue?: string;
  onCountryChange?: (value: string) => void;
  countryOptions?: { value: string; label: string }[];
};

export type CommonTextAreaProps = {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  error?: string;
  touched?: boolean;
  rows?: number;
};

export type CommonOtpInputProps = {
  name: string;
  label?: string;
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  touched?: boolean;
};

export type CollectionMenuProps = {
  isMobile?: boolean;
};
