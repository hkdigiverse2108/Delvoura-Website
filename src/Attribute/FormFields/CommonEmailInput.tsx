import { Form, Input } from "antd";
import type { CommonEmailInputProps } from "../../Types";


export const CommonEmailInput = ({ name, label = "Email", placeholder = "you@example.com",}:CommonEmailInputProps) => {
  return (
    <Form.Item name={name} label={label} className="mb-4">
      <Input type="email" placeholder={placeholder} size="large" />
    </Form.Item>
  );
};

export default CommonEmailInput;
