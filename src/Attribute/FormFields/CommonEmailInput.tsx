import { Form, Input } from "antd";
import type { CommonEmailInputProps } from "../../Types";

export const CommonEmailInput = ({ name, label = "Email", placeholder = "you@example.com", value, onChange, onBlur, error, touched }: CommonEmailInputProps) => {
  const hasError = touched && !!error;
  return (
    <div>
      <label className="mb-2 block text-sm text-[color:var(--color-text)]">{label}</label>
      <Form.Item name={name} className="mb-0" validateStatus={hasError ? "error" : ""} help={hasError ? error : undefined}>
        <Input type="email" placeholder={placeholder} size="large" value={value} onChange={onChange} onBlur={onBlur} />
      </Form.Item>
    </div>
  );
};

export default CommonEmailInput;
