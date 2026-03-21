import { Form, Input } from "antd";
import type { CommonTextAreaProps } from "../../Types";

export const CommonTextArea = ({ name, label, placeholder, value, onChange, onBlur, error, touched, rows = 4 }: CommonTextAreaProps) => {
  const hasError = touched && !!error;
  return (
    <div>
      <label className="mb-2 block text-sm text-[color:var(--color-text)]">{label}</label>
      <Form.Item name={name} className="mb-0" validateStatus={hasError ? "error" : ""} help={hasError ? error : undefined}>
        <Input.TextArea placeholder={placeholder} rows={rows} value={value} onChange={onChange} onBlur={onBlur} />
      </Form.Item>
    </div>
  );
};

export default CommonTextArea;
