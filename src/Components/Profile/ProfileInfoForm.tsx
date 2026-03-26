import { Button, Form, Input, Select, Typography, message } from "antd";
import { useMemo } from "react";

const { Text } = Typography;

interface ProfileInfoFormProps {
  isEditing: boolean;
  onEditChange: (next: boolean) => void;
}

const ProfileInfoForm = ({ isEditing, onEditChange }: ProfileInfoFormProps) => {
  const [form] = Form.useForm();

  const initialValues = useMemo(
    () => ({
      firstName: "Aarav",
      lastName: "Mehta",
      email: "aarav.mehta@delvoura.com",
      phone: "+91 98765 43210",
      gender: "Male",
      dob: "1995-02-18",
      language: "English",
      company: "Delvoura",
      bio: "Product Designer",
      city: "Bengaluru",
      role: "Product Designer",
      location: "Bengaluru, India",
    }),
    []
  );

  const handleSave = async () => {
    try {
      await form.validateFields();
      onEditChange(false);
      message.success("Profile updated successfully");
    } catch {
      // validation handles UI feedback
    }
  };

  const handleCancel = () => {
    form.setFieldsValue(initialValues);
    onEditChange(false);
  };

  return (
    <div className="space-y-5">

      <Form form={form} layout="vertical" className="" initialValues={initialValues}>
          {!isEditing ? (
            <div className="profile-info-grid grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
              <div className="profile-info-item">
                <Text className="profile-info-label">First Name</Text>
                <Text className="profile-info-value">{initialValues.firstName}</Text>
              </div>
              <div className="profile-info-item">
                <Text className="profile-info-label">Last Name</Text>
                <Text className="profile-info-value">{initialValues.lastName}</Text>
              </div>
              <div className="profile-info-item">
                <Text className="profile-info-label">Email</Text>
                <Text className="profile-info-value">{initialValues.email}</Text>
              </div>
              <div className="profile-info-item">
                <Text className="profile-info-label">Phone</Text>
                <Text className="profile-info-value">{initialValues.phone}</Text>
              </div>
              <div className="profile-info-item">
                <Text className="profile-info-label">Gender</Text>
                <Text className="profile-info-value">{initialValues.gender}</Text>
              </div>
              <div className="profile-info-item">
                <Text className="profile-info-label">Date of Birth</Text>
                <Text className="profile-info-value">{initialValues.dob}</Text>
              </div>
              <div className="profile-info-item">
                <Text className="profile-info-label">Preferred Language</Text>
                <Text className="profile-info-value">{initialValues.language}</Text>
              </div>
              <div className="profile-info-item">
                <Text className="profile-info-label">Company</Text>
                <Text className="profile-info-value">{initialValues.company}</Text>
              </div>
              <div className="profile-info-item">
                <Text className="profile-info-label">Bio</Text>
                <Text className="profile-info-value">{initialValues.bio}</Text>
              </div>
              <div className="profile-info-item">
                <Text className="profile-info-label">City</Text>
                <Text className="profile-info-value">{initialValues.city}</Text>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: "First name is required" }]}>
                  <Input placeholder="Enter first name" />
                </Form.Item>
                <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: "Last name is required" }]}>
                  <Input placeholder="Enter last name" />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: "Email is required" }, { type: "email", message: "Enter a valid email" }]}>
                  <Input placeholder="Enter email" />
                </Form.Item>
                <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Phone number is required" }]}>
                  <Input placeholder="Enter phone" />
                </Form.Item>
                <Form.Item name="gender" label="Gender">
                  <Select options={[{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }, { value: "Other", label: "Other" }]} />
                </Form.Item>
                <Form.Item name="dob" label="Date of Birth">
                  <Input placeholder="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item name="language" label="Preferred Language">
                  <Select options={[{ value: "English", label: "English" }, { value: "Hindi", label: "Hindi" }, { value: "Tamil", label: "Tamil" }]} />
                </Form.Item>
                <Form.Item name="company" label="Company (Optional)">
                  <Input placeholder="Enter company" />
                </Form.Item>
                <Form.Item name="bio" label="Bio">
                  <Input placeholder="Add role" />
                </Form.Item>
                <Form.Item name="city" label="City">
                  <Input placeholder="Enter city" />
                </Form.Item>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button type="primary" onClick={handleSave}>
                  Save Changes
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </div>
            </>
          )}
      </Form>
    </div>
  );
};

export default ProfileInfoForm;
