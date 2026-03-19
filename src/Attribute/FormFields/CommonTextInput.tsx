import { Form, Input } from "antd";
import type { CommonTextInputProps } from "../../Types";

export const CommonTextInput = ({ name, label, placeholder, value, onChange, onBlur, error, touched }: CommonTextInputProps) => {
  const hasError = touched && !!error;
  return (
    <div>
      <label className="mb-2 block text-sm text-[color:var(--color-text)]">{label}</label>
      <Form.Item name={name} className="mb-0" validateStatus={hasError ? "error" : ""} help={hasError ? error : undefined}>
        <Input placeholder={placeholder} size="large" value={value} onChange={onChange} onBlur={onBlur} />
      </Form.Item>
    </div>
  );
};

export default CommonTextInput;
