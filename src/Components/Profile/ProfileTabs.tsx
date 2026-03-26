import { Card, Tabs } from "antd";
import { useEffect, useState } from "react";
import ProfileInfoForm from "./ProfileInfoForm";
import ProfileHeaderCard from "./ProfileHeaderCard";
import AddressManager from "./AddressManager";
import ChangePasswordForm from "./ChangePasswordForm";
import MyOrders from "./MyOrders";
import { UserOutlined, HomeOutlined, ShoppingOutlined, LockOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../Store/Hooks";
import { Queries } from "../../Api";

const ProfileTabs = () => {
  const [tabPosition, setTabPosition] = useState<"left" | "top">("left");
  const [isEditing, setIsEditing] = useState(false);
  const { user: storeUser } = useAppSelector((state) => state.auth);
  const { data: userData } = Queries.useGetSingleUser( ((storeUser as { _id?: string } | null)?._id), );
  
  const resolveUser = (input: unknown) => {
    if (!input) return null;
    return (
      (input as { data?: { user?: unknown } })?.data?.user ??
      (input as { data?: unknown })?.data ??
      (input as { user?: unknown })?.user ??
      input
    );
  };
  const resolvedUser = resolveUser(userData) ?? resolveUser(storeUser) ?? {};

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
      <Tabs defaultActiveKey="profile-info" tabPosition={tabPosition} tabBarStyle={tabPosition === "left" ? { width: 240 } : undefined} className="profile-settings-tabs" items={[
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
                  <ProfileHeaderCard onEdit={() => setIsEditing(true)} user={resolvedUser} />
                </div>
                <div className="profile-info-section profile-info-divider">
                  <ProfileInfoForm isEditing={isEditing} onEditChange={setIsEditing} user={resolvedUser} />
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
