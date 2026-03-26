import { Form, Input, Modal, Switch } from "antd";
import { useEffect } from "react";
import type { AddressData } from "./AddressCard";

interface AddressFormModalProps {
  open: boolean;
  initialValues?: AddressData | null;
  onCancel: () => void;
  onSubmit: (values: Omit<AddressData, "id">) => void;
}

const AddressFormModal = ({ open, initialValues, onCancel, onSubmit }: AddressFormModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.resetFields();
      if (initialValues) {
        const { id, ...rest } = initialValues;
        form.setFieldsValue(rest);
      }
    }
  }, [open, initialValues, form]);

  return (
    <Modal
      open={open}
      title={initialValues ? "Edit Address" : "Add New Address"}
      onCancel={onCancel}
      okText={initialValues ? "Save Address" : "Add Address"}
      onOk={() => form.submit()}
      width={760}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          label: "Home",
          name: "Aarav Mehta",
          phone: "+91 98765 43210",
          street: "742 Sunrise Residency",
          area: "Sector 12",
          landmark: "Near Lotus Park",
          city: "Bengaluru",
          state: "Karnataka",
          country: "India",
          pincode: "560102",
          isDefault: false,
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Form.Item name="label" label="Address Label" rules={[{ required: true, message: "Label is required" }]}>
            <Input placeholder="Home / Work" />
          </Form.Item>
          <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Name is required" }]}>
            <Input placeholder="Recipient name" />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Phone is required" }]}>
            <Input placeholder="Phone number" />
          </Form.Item>
          <Form.Item name="street" label="Street Address" rules={[{ required: true, message: "Street is required" }]}>
            <Input placeholder="Flat / House / Building" />
          </Form.Item>
          <Form.Item name="area" label="Area" rules={[{ required: true, message: "Area is required" }]}>
            <Input placeholder="Sector / Locality" />
          </Form.Item>
          <Form.Item name="landmark" label="Landmark" rules={[{ required: true, message: "Landmark is required" }]}>
            <Input placeholder="Near landmark" />
          </Form.Item>
          <Form.Item name="city" label="City" rules={[{ required: true, message: "City is required" }]}>
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item name="state" label="State" rules={[{ required: true, message: "State is required" }]}>
            <Input placeholder="State" />
          </Form.Item>
          <Form.Item name="country" label="Country" rules={[{ required: true, message: "Country is required" }]}>
            <Input placeholder="Country" />
          </Form.Item>
          <Form.Item name="pincode" label="Pincode" rules={[{ required: true, message: "Pincode is required" }]}>
            <Input placeholder="Postal code" />
          </Form.Item>
        </div>
        <Form.Item name="isDefault" label="Set as default" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddressFormModal;
