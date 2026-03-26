import { Button, Typography, message } from "antd";
import { useMemo, useState } from "react";
import AddressCard from "./AddressCard";
import type { AddressData } from "./AddressCard";
import AddressFormModal from "./AddressFormModal";

const { Title, Text } = Typography;

const initialAddresses: AddressData[] = [
  {
    id: "addr-1",
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
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Work",
    name: "Aarav Mehta",
    phone: "+91 98765 43210",
    street: "5th Floor, Orion Tech Park",
    area: "MG Road",
    landmark: "Opp. City Mall",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    pincode: "560001",
  },
];

const AddressManager = () => {
  const [addresses, setAddresses] = useState<AddressData[]>(initialAddresses);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressData | null>(null);

  const sortedAddresses = useMemo(() => {
    return [...addresses].sort((a, b) => Number(Boolean(b.isDefault)) - Number(Boolean(a.isDefault)));
  }, [addresses]);

  const handleAdd = () => {
    setEditingAddress(null);
    setModalOpen(true);
  };

  const handleEdit = (address: AddressData) => {
    setEditingAddress(address);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((item) => item.id !== id));
    message.success("Address deleted");
  };

  const handleSubmit = (values: Omit<AddressData, "id">) => {
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((item) =>
          item.id === editingAddress.id
            ? { ...item, ...values }
            : values.isDefault
            ? { ...item, isDefault: false }
            : item
        )
      );
      message.success("Address updated");
    } else {
      setAddresses((prev) => [
        { id: `addr-${Date.now()}`, ...values },
        ...prev.map((item) => (values.isDefault ? { ...item, isDefault: false } : item)),
      ]);
      message.success("Address added");
    }
    setModalOpen(false);
    setEditingAddress(null);
  };

  return (
    <div className="space-y-6 pt-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Title level={5} className="!mb-0">
            Address Book
          </Title>
          <Text className="text-sm text-[color:var(--color-text-muted)]">
            Manage delivery locations for faster checkout and easy returns.
          </Text>
        </div>
        <Button type="primary" className="bg-[color:var(--color-accent)] w-full sm:w-auto" onClick={handleAdd}>
          Add New Address
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {sortedAddresses.map((address) => (
          <AddressCard key={address.id} address={address} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      <AddressFormModal
        open={modalOpen}
        initialValues={editingAddress}
        onCancel={() => {
          setModalOpen(false);
          setEditingAddress(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddressManager;
