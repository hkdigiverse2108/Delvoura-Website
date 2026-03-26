import { Button, Card, Tag, Typography } from "antd";

const { Text, Title } = Typography;

export interface AddressData {
  id: string;
  label: string;
  name: string;
  phone: string;
  street: string;
  area: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  isDefault?: boolean;
}

interface AddressCardProps {
  address: AddressData;
  onEdit: (address: AddressData) => void;
  onDelete: (id: string) => void;
}

const AddressCard = ({ address, onEdit, onDelete }: AddressCardProps) => {
  return (
    <Card className="address-card h-full border border-[color:var(--color-border)] bg-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Title level={5} className="!mb-0">
              {address.label}
            </Title>
            <Tag color={address.isDefault ? "green" : "default"}>
              {address.isDefault ? "Default" : "Saved"}
            </Tag>
          </div>
          <Text className="block font-medium text-[color:var(--color-text)]">{address.name}</Text>
          <Text className="block text-sm text-[color:var(--color-text-muted)]">{address.phone}</Text>
          <Text className="block text-sm text-[color:var(--color-text-muted)]">
            {address.street}, {address.area}
          </Text>
          <Text className="block text-sm text-[color:var(--color-text-muted)]">
            Landmark: {address.landmark}
          </Text>
          <Text className="block text-sm text-[color:var(--color-text-muted)]">
            {address.city}, {address.state}, {address.country} - {address.pincode}
          </Text>
        </div>
        <div className="flex gap-2 sm:flex-col">
          <Button onClick={() => onEdit(address)}>Edit</Button>
          <Button danger onClick={() => onDelete(address.id)}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AddressCard;
