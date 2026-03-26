import { Avatar, Progress, Typography } from "antd";

const { Text, Title } = Typography;

interface ProfileHeaderCardProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  memberSince: string;
  profileStrength: number;
  onEdit?: () => void;
}

const getInitials = (firstName: string, lastName: string) => {
  const first = firstName?.trim()?.[0] ?? "";
  const last = lastName?.trim()?.[0] ?? "";
  return `${first}${last}`.toUpperCase() || "U";
};

const ProfileHeaderCard = ({
  firstName,
  lastName,
  email,
  phone,
  memberSince,
  profileStrength,
  onEdit,
}: ProfileHeaderCardProps) => {
  return (
    <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col items-start gap-4 text-left sm:flex-row sm:items-center">
        <div className="profile-avatar-ring">
          <Avatar
            size={80}
            className="bg-[color:var(--color-accent)] text-lg font-semibold text-white"
          >
            {getInitials(firstName, lastName)}
          </Avatar>
          <span className="profile-strength-badge">{profileStrength}%</span>
        </div>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <Title level={4} className="!mb-0">
              {firstName} {lastName}
            </Title>
            <Progress
              type="circle"
              percent={profileStrength}
              size={44}
              strokeWidth={10}
              format={(percent) => `${percent}%`}
              strokeColor="#eb4a2e"
              trailColor="#f1f1f1"
            />
          </div>
          <Text className="block text-[color:var(--color-text-muted)]">{email}</Text>
          <Text className="block text-[color:var(--color-text-muted)]">{phone}</Text>
          <Text className="block text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">
            Member since {memberSince}
          </Text>
        </div>
      </div>
      

      <button
        className="absolute right-0 top-0 rounded-[15px] border border-[color:var(--color-border)] px-4 py-2 text-sm font-medium text-[color:var(--color-text)]"
        type="button"
        onClick={onEdit}
      >
        Edit
      </button>
    </div>
  );
};

export default ProfileHeaderCard;
