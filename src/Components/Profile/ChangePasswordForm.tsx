import { Button, Form, Input, Typography, message } from "antd";

const { Title, Text } = Typography;

const ChangePasswordForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      message.success("Password updated successfully");
      form.resetFields();
    } catch {
      // validation handles UI feedback
    }
  };

  return (
    <div className="w-full pt-5 ">
      <div className="mb-4">
        <Title level={5} className="!mb-1">
          Change Password
        </Title>
        <Text className="text-sm text-[color:var(--color-text-muted)]">
          Use a strong password with letters, numbers, and symbols.
        </Text>
      </div>

      <div className="rounded-[15px] border border-[color:var(--color-border)] bg-white p-6">
        <Form form={form} layout="vertical" className="max-w-md profile-compact-form">
          <Form.Item name="currentPassword" label="Current Password" rules={[{ required: true, message: "Current password is required" }]}>
            <Input.Password placeholder="Enter current password" size="small" />
          </Form.Item>
          <Form.Item name="newPassword" label="New Password" rules={[{ required: true, message: "New password is required" }, { min: 8, message: "Password must be at least 8 characters" }]}>
            <Input.Password placeholder="Enter new password" size="small" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Re-enter new password" size="small" />
          </Form.Item>

          <Button type="primary" className="bg-[color:var(--color-accent)]" onClick={handleSubmit}>
            Update Password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
