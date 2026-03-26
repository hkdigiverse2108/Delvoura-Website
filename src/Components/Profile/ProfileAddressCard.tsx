import { Button, Card, Typography } from "antd";

const { Text, Title } = Typography;

const ProfileAddressCard = () => {
  return (
    <Card className="rounded-2xl border border-[color:var(--color-border)] bg-white">
      <div className="flex items-start justify-between">
        <div>
          <Title level={5} className="!mb-1">
            Address
          </Title>
          <Text className="text-sm text-[color:var(--color-text-muted)]">
            Primary delivery address.
          </Text>
        </div>
        <Button className="rounded-full px-4">Edit</Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
        <div>
          <Text className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">Country</Text>
          <Text className="mt-2 block font-medium">India</Text>
        </div>
        <div>
          <Text className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">City / State</Text>
          <Text className="mt-2 block font-medium">Bengaluru, Karnataka</Text>
        </div>
        <div>
          <Text className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">Postal Code</Text>
          <Text className="mt-2 block font-medium">560102</Text>
        </div>
        <div>
          <Text className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">Tax ID</Text>
          <Text className="mt-2 block font-medium">GSTIN 29ABCDE1234F1Z5</Text>
        </div>
      </div>
    </Card>
  );
};

export default ProfileAddressCard;
