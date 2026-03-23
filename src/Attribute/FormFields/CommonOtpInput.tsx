import { Form, Input } from "antd";
import type { InputRef } from "antd";
import { useMemo, useRef } from "react";
import type { CommonOtpInputProps } from "../../Types";

export const CommonOtpInput = ({ name, label = "OTP", length = 4, value = "", onChange, onBlur, error, touched }: CommonOtpInputProps) => {
  const hasError = touched && !!error;
  const inputs = useRef<Array<InputRef | null>>([]);
  const chars = useMemo(() => {
    const safe = value.replace(/\D/g, "").slice(0, length);
    return Array.from({ length }, (_, i) => safe[i] ?? "");
  }, [value, length]);

  const updateValue = (nextChars: string[]) => {
    const nextValue = nextChars.join("").replace(/\D/g, "").slice(0, length);
    onChange?.(nextValue);
  };

  const handleChange = (index: number, next: string) => {
    const digit = next.replace(/\D/g, "").slice(-1);
    const nextChars = [...chars];
    nextChars[index] = digit;
    updateValue(nextChars);
    if (digit && inputs.current[index + 1]) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !chars[index] && inputs.current[index - 1]) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!paste) return;
    const nextChars = Array.from({ length }, (_, i) => paste[i] ?? "");
    updateValue(nextChars);
    const nextIndex = Math.min(paste.length, length - 1);
    inputs.current[nextIndex]?.focus();
  };

  return (
    <div>
      <label className="mb-2 block text-sm text-[color:var(--color-text)]">{label}</label>
      <Form.Item name={name} className="mb-0" validateStatus={hasError ? "error" : ""} help={hasError ? error : undefined}>
        <div className="flex items-center justify-center gap-3">
          {Array.from({ length }, (_, index) => (
            <Input key={`otp-${index}`} inputMode="numeric" maxLength={1} value={chars[index]} onChange={(e) => handleChange(index, e.target.value)} onKeyDown={(e) => handleKeyDown(index, e)} onPaste={handlePaste} onBlur={onBlur} ref={(el) => {inputs.current[index] = el;}} className="h-12 w-12 rounded-xl text-center text-base" size="large" />
          ))}
        </div>
      </Form.Item>
    </div>
  );
};

export default CommonOtpInput;
