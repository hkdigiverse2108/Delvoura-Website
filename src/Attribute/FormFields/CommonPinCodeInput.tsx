import { Input } from "antd";
import type React from "react";
import type { CommonPinCodeInputProps } from "../../Types";

export const CommonPinCodeInput = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
}: CommonPinCodeInputProps) => {
  const hasError = touched && !!error;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "").slice(0, 6);
    const nextEvent = {
      ...event,
      target: { ...event.target, name, value: numericValue },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange?.(nextEvent);
  };

  return (
    <div>
      <label className="mb-2 block text-sm text-[color:var(--color-text)]">{label}</label>
      <div>
        <Input
          name={name}
          placeholder={placeholder}
          size="large"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          autoComplete="postal-code"
          status={hasError ? "error" : ""}
          style={{ borderColor: hasError ? "#ff4d4f" : undefined }}
        />
        {hasError && <div className="mt-1 text-sm text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default CommonPinCodeInput;
