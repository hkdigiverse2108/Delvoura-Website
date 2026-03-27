import { Button, Spin, Typography, message } from "antd";
import { useMemo, useState } from "react";
import AddressCard from "./AddressCard";
import type { AddressData } from "./AddressCard";
import AddressFormModal, { type AddressFormValues } from "./AddressFormModal";
import { Mutations } from "../../Api";
import { useAppSelector } from "../../Store/Hooks";

const { Title, Text } = Typography;

interface AddressManagerProps {
  addresses: AddressData[];
  isLoading?: boolean;
}

const AddressManager = ({ addresses, isLoading }: AddressManagerProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressData | null>(null);
  const { token } = useAppSelector((state) => state.auth);

  const { mutateAsync: createAddress, isPending: isCreating } = Mutations.useCreateAddress(token ?? undefined);
  const { mutateAsync: updateAddress, isPending: isUpdating } = Mutations.useUpdateAddress(token ?? undefined);
  const { mutate: deleteAddress, isPending: isDeleting } = Mutations.useDeleteAddress(token ?? undefined);

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
    if (!token) {
      message.error("Please sign in to continue");
      return;
    }
    deleteAddress(
      { id },
      {
        onSuccess: () => message.success("Address deleted"),
        onError: () => message.error("Delete failed"),
      }
    );
  };

  const handleSubmit = async (values: AddressFormValues) => {
    if (!token) {
      message.error("Please sign in to continue");
      return;
    }

    try {
      if (editingAddress) {
        if (!editingAddress._id) {
          message.error("Address id not found");
          return;
        }
        await updateAddress({ addressId: editingAddress._id, ...values });
        message.success("Address updated");
      } else {
        await createAddress(values);
        message.success("Address added");
      }
      setModalOpen(false);
      setEditingAddress(null);
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const isBusy = isCreating || isUpdating || isDeleting;

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
        <Button
          type="primary"
          className="bg-[color:var(--color-accent)] w-full sm:w-auto"
          onClick={handleAdd}
          loading={isBusy}
        >
          Add New Address
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spin />
        </div>
      ) : sortedAddresses.length === 0 ? (
        <div className="text-center text-sm text-[color:var(--color-text-muted)]">
          <img src="/assets/images/order/empty.png" alt="No addresses" className="mx-auto mb-3 w-40 opacity-80" />
          <div>No addresses yet</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {sortedAddresses.map((address) => (
            <AddressCard key={address._id || `${address.address1}-${address.pinCode}`} address={address} onEdit={handleEdit} onDelete={handleDelete}  />
          ))}
        </div>
      )}

      <AddressFormModal open={modalOpen} initialValues={editingAddress} onCancel={() => { setModalOpen(false); setEditingAddress(null); }}onSubmit={handleSubmit}/>
    </div>
  );
};

export default AddressManager;
