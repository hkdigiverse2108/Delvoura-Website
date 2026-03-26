import { Input } from "antd";
import type { CommonEmailInputProps } from "../../Types";

export const CommonEmailInput = ({ name, label = "Email", placeholder = "you@example.com", value, onChange, onBlur, error, touched }: CommonEmailInputProps) => {
  const hasError = touched && !!error;
  return (
    <div>
      <label className="mb-2 block text-sm text-[color:var(--color-text)]">{label}</label>
      <div>
        <Input  name={name} type="email"  placeholder={placeholder}  size="large"  value={value}  onChange={onChange}  onBlur={onBlur} status={hasError ? "error" : ""} style={{  borderColor: hasError ? "#ff4d4f" : undefined, }} />
        {hasError && <div className="mt-1 text-sm text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default CommonEmailInput;
