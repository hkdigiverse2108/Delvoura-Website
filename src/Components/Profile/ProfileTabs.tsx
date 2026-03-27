import { Card, Tabs } from "antd";
import { useEffect, useMemo, useState } from "react";
import ProfileInfoForm from "./ProfileInfoForm";
import ProfileHeaderCard from "./ProfileHeaderCard";
import AddressManager from "./AddressManager";
import ChangePasswordForm from "./ChangePasswordForm";
import MyOrders from "./MyOrders";
import { UserOutlined, HomeOutlined, ShoppingOutlined, LockOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../Store/Hooks";
import { Queries } from "../../Api";
import { setAddresses } from "../../Store/Slices/AddressSlice";
import type { AddressItem } from "../../Types";

const ProfileTabs = () => {
  const [tabPosition, setTabPosition] = useState<"left" | "top">("left");
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const { user: storeUser, token } = useAppSelector((state) => state.auth);
  //Users Data
  const { data: userData } = Queries.useGetSingleUser( ((storeUser as { _id?: string } | null)?._id), );

  //Address
  const { data: addressData, isLoading: isAddressLoading } = Queries.useGetAddresses(undefined, token ?? undefined);
  const addresses = useAppSelector((state) => state.address.items);
  
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

  const resolveAddressList = (input: unknown): AddressItem[] => {
    if (!input) return [];
    const root = (input as { data?: unknown })?.data ?? input;
    if (Array.isArray(root)) return root;
    const data = root as { address_data?: unknown; addresses?: unknown; data?: unknown };
    if (Array.isArray(data.address_data)) return data.address_data;
    if (Array.isArray(data.addresses)) return data.addresses;
    if (Array.isArray(data.data)) return data.data;
    return [];
  };

  const resolvedAddresses = useMemo(() => resolveAddressList(addressData), [addressData]);

  useEffect(() => {
    dispatch(setAddresses(resolvedAddresses));
  }, [dispatch, resolvedAddresses]);

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
            children: <AddressManager addresses={addresses} isLoading={isAddressLoading} />,
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
