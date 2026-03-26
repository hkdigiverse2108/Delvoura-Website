import { Card, Tabs } from "antd";
import { useEffect, useState } from "react";
import ProfileInfoForm from "./ProfileInfoForm";
import ProfileHeaderCard from "./ProfileHeaderCard";
import AddressManager from "./AddressManager";
import ChangePasswordForm from "./ChangePasswordForm";
import MyOrders from "./MyOrders";
import { UserOutlined, HomeOutlined, ShoppingOutlined, LockOutlined } from "@ant-design/icons";

const ProfileTabs = () => {
  const [tabPosition, setTabPosition] = useState<"left" | "top">("left");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setTabPosition(window.innerWidth < 768 ? "top" : "left");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card className="profile-main-card w-full border border-[color:var(--color-border)] bg-white">
      <Tabs
        defaultActiveKey="profile-info"
        tabPosition={tabPosition}
        tabBarStyle={tabPosition === "left" ? { width: 240 } : undefined}
        className="profile-settings-tabs"
        items={[
          {
            key: "profile-info",
            label: (
              <span className="flex items-center gap-2">
                <UserOutlined /> Profile Info
              </span>
            ),
            children: (
              <div className="profile-info-shell">
                <div className="profile-info-section">
                  <ProfileHeaderCard
                    firstName="Aarav"
                    lastName="Mehta"
                    email="aarav.mehta@delvoura.com"
                    phone="+91 98765 43210"
                    memberSince="Jan 2022"
                    profileStrength={82}
                    onEdit={() => setIsEditing(true)}
                  />
                </div>
                <div className="profile-info-section profile-info-divider">
                  <ProfileInfoForm isEditing={isEditing} onEditChange={setIsEditing} />
                </div>
              </div>
            ),
          },
          {
            key: "address",
            label: (
              <span className="flex items-center gap-2">
                <HomeOutlined /> Address
              </span>
            ),
            children: <AddressManager />,
          },
          {
            key: "my-orders",
            label: (
              <span className="flex items-center gap-2">
                <ShoppingOutlined /> My Orders
              </span>
            ),
            children: <MyOrders />,
          },
          {
            key: "change-password",
            label: (
              <span className="flex items-center gap-2">
                <LockOutlined /> Change Password
              </span>
            ),
            children: <ChangePasswordForm />,
          },
        ]}
      />
    </Card>
  );
};

export default ProfileTabs;
