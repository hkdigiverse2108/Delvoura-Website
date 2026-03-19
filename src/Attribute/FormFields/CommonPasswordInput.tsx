import { Form, Input } from "antd";
import type { CommonPasswordInputProps } from "../../Types";

export const CommonPasswordInput = ({ name, label = "Password", placeholder = "*************", value, onChange, onBlur, error, touched }: CommonPasswordInputProps) => {
  const hasError = touched && !!error;
  return (
    <div>
      <label className="mb-2 block text-sm text-[color:var(--color-text)]">{label}</label>
      <Form.Item name={name} className="mb-0" validateStatus={hasError ? "error" : ""} help={hasError ? error : undefined}>
        <Input.Password placeholder={placeholder} size="large" value={value} onChange={onChange} onBlur={onBlur} />
      </Form.Item>
    </div>
  );
};

export default CommonPasswordInput;
