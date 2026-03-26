import { Button, Card, Typography } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const ProfileOverviewCard = () => {
  return (
    <Card className="rounded-2xl border border-[color:var(--color-border)] bg-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 overflow-hidden rounded-full bg-[color:var(--color-card)]" />
          <div>
            <Title level={5} className="!mb-0">
              Aarav Mehta
            </Title>
            <Text className="block text-sm text-[color:var(--color-text-muted)]">Product Designer</Text>
            <Text className="mt-1 block text-sm text-[color:var(--color-text-muted)]">
              <EnvironmentOutlined className="mr-2" />
              Bengaluru, Karnataka, India
            </Text>
          </div>
        </div>
        <Button className="rounded-full px-4">Edit</Button>
      </div>
    </Card>
  );
};

export default ProfileOverviewCard;
