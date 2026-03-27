import { Button, Card, Typography } from "antd";

const { Text, Title } = Typography;

const ProfilePersonalInfoCard = () => {
  return (
    <Card className="rounded-2xl border border-[color:var(--color-border)] bg-white">
      <div className="flex items-start justify-between">
        <div>
          <Title level={5} className="!mb-1">
            Personal information
          </Title>
          <Text className="text-sm text-[color:var(--color-text-muted)]">
            Update your personal details.
          </Text>
        </div>
        <Button className="rounded-full px-4 profile-action-edit">Edit</Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
        <div>
          <Text className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">First Name</Text>
          <Text className="mt-2 block font-medium">Aarav</Text>
        </div>
        <div>
          <Text className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">Last Name</Text>
          <Text className="mt-2 block font-medium">Mehta</Text>
        </div>
        <div>
          <Text className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">Email Address</Text>
          <Text className="mt-2 block font-medium">aarav.mehta@delvoura.com</Text>
        </div>
        <div>
          <Text className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">Phone</Text>
          <Text className="mt-2 block font-medium">+91 98765 43210</Text>
        </div>
        <div>
          <Text className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">Bio</Text>
          <Text className="mt-2 block font-medium">Product Designer</Text>
        </div>
      </div>
    </Card>
  );
};

export default ProfilePersonalInfoCard;
