import { Form, Input } from "antd";
import type { CommonPasswordInputProps } from "../../Types";

export const CommonPasswordInput = ({ name, label = "Password", placeholder = "••••••••", }: CommonPasswordInputProps) => {
  return (
    <Form.Item name={name} label={label} className="mb-4">
      <Input.Password placeholder={placeholder} size="large" />
    </Form.Item>
  );
};

export default CommonPasswordInput;
