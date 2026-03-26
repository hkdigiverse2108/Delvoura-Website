import { Typography } from "antd";
import { UserOutlined, SafetyOutlined, TeamOutlined, UsergroupAddOutlined, BellOutlined, CreditCardOutlined, CloudDownloadOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

const navItems = [
  { label: "My Profile", icon: <UserOutlined />, active: true },
  { label: "Security", icon: <SafetyOutlined /> },
  { label: "Teams", icon: <TeamOutlined /> },
  { label: "Team Member", icon: <UsergroupAddOutlined /> },
  { label: "Notifications", icon: <BellOutlined /> },
  { label: "Billing", icon: <CreditCardOutlined /> },
  { label: "Data Export", icon: <CloudDownloadOutlined /> },
  { label: "Delete Account", icon: <DeleteOutlined />, danger: true },
];

const ProfileSidebar = () => {
  return (
    <div className="space-y-3">
      {navItems.map((item) => (
        <div
          key={item.label}
          className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium ${
            item.active
              ? "bg-[color:var(--color-secondary-bg)] text-[color:var(--color-text)]"
              : item.danger
              ? "text-[color:var(--color-error)]"
              : "text-[color:var(--color-text-muted)]"
          }`}
        >
          <span className="text-base">{item.icon}</span>
          <Text className="text-sm" style={{ color: "inherit" }}>
            {item.label}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default ProfileSidebar;
