import { Input } from "antd";
import type { CommonTextInputProps } from "../../Types";

export const CommonTextInput = ({ name, label, placeholder, value, onChange, onBlur, error, touched }: CommonTextInputProps) => {
  const hasError = touched && !!error;
  return (
    <div>
      <label className="mb-2 block text-sm text-[color:var(--color-text)]">{label}</label>
      <div>
        <Input  name={name} placeholder={placeholder}  size="large"  value={value}  onChange={onChange}  onBlur={onBlur} status={hasError ? "error" : ""} style={{  borderColor: hasError ? "#ff4d4f" : undefined, }} />
        {hasError && <div className="mt-1 text-sm text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default CommonTextInput;
