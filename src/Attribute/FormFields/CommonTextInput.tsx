import { Form, Input } from "antd";
import type { CommonTextInputProps } from "../../Types";

export const CommonTextInput = ({ name, label, placeholder }: CommonTextInputProps) => {
  return (
    <Form.Item name={name} label={label} className="mb-4">
      <Input placeholder={placeholder} size="large" />
    </Form.Item>
  );
};

export default CommonTextInput;
