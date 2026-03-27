import { Button, Card, Tag, Typography } from "antd";
import type { AddressItem } from "../../Types";

const { Text, Title } = Typography;

export type AddressData = AddressItem;

interface AddressCardProps {
  address: AddressData;
  onEdit: (address: AddressData) => void;
  onDelete: (id: string) => void;
}

const AddressCard = ({ address, onEdit, onDelete }: AddressCardProps) => {
  const locationParts = [address.city, address.state, address.country].filter(Boolean).join(", ");
  return (
    <Card className="address-card h-full border border-[color:var(--color-border)] bg-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Title level={5} className="!mb-0">
              {address.address1 || "Address"}
            </Title>
            <Tag color={address.isDefault ? "green" : "default"}>
              {address.isDefault ? "Default" : "Saved"}
            </Tag>
          </div>
          <Text className="block text-sm text-[color:var(--color-text-muted)]">
            {address.address1}
          </Text>
          {address.address2 ? (
            <Text className="block text-sm text-[color:var(--color-text-muted)]">
              Landmark: {address.address2}
            </Text>
          ) : null}
          <Text className="block text-sm text-[color:var(--color-text-muted)]">
            {locationParts}
            {locationParts && address.pinCode ? " - " : ""}
            {address.pinCode}
          </Text>
        </div>
        <div className="flex gap-2 sm:flex-col">
          <Button className="profile-action-edit" onClick={() => onEdit(address)}>
            Edit
          </Button>
          <Button danger onClick={() => address._id && onDelete(address._id)}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AddressCard;
