import { Input } from "antd";
import type { CommonPasswordInputProps } from "../../Types";

export const CommonPasswordInput = ({ name, label = "Password", placeholder = "*************", value, onChange, onBlur, error, touched }: CommonPasswordInputProps) => {
  const hasError = touched && !!error;
  return (
    <div>
      <label className="mb-2 block text-sm text-[color:var(--color-text)]">{label}</label>
      <div>
        <Input.Password name={name} placeholder={placeholder} size="large" value={value} onChange={onChange} onBlur={onBlur} status={hasError ? "error" : ""} />
        {hasError && <div className="mt-1 text-sm text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default CommonPasswordInput;
