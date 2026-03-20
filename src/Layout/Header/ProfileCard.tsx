import { Avatar, Dropdown } from "antd";
import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/Hooks";
import { setSignOut } from "../../Store/Slices/AuthSlice";
import { Queries } from "../../Api";
import type { ProfileCardProps } from "../../Types";
import LogoutConfirmModel from "../../Components/ConfirmModel/LogoutConfirmModel";


const getInitials = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return `${first}${last}`.toUpperCase() || "U";
};

const ProfileCard = ({ variant = "desktop", user: userProp, userData: userDataProp,}: ProfileCardProps) => {
  const dispatch = useAppDispatch();
  const { user: storeUser, isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: fetchedUserData } = Queries.useGetSingleUser(((userProp ?? storeUser) as { _id?: string } | null)?._id);
  const userData = userDataProp ?? fetchedUserData;
  const isLoggedIn = isAuthenticated || !!userData;
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dataUser = (userData as { data?: { user?: unknown } })?.data?.user ?? (userData as { data?: unknown })?.data ?? userProp ??  storeUser;

  const safeUser = (dataUser ?? {}) as {
    firstName?: string;
    lastName?: string;
    name?: string;
    fullName?: string;
  };

  const fullName = safeUser.name || safeUser.fullName || [safeUser.firstName, safeUser.lastName].filter(Boolean).join(" ").trim() || "User";
  const initials = getInitials(fullName);

  if (!isLoggedIn) return null;

  if (variant === "mobile") {
    return (
      <div>
        <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between rounded-xl bg-[color:var(--color-card)] px-4 py-3 text-sm font-semibold" style={{ color: "var(--color-text)", border: "1px solid var(--color-border)" }}>
          <span className="flex items-center gap-3">
            <Avatar className="!bg-[color:var(--color-accent)] !text-[color:var(--color-text-on-dark)]">{initials}</Avatar>
            {fullName}
          </span>
          <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
        </button>

        {open && (
          <div className="mt-3 flex flex-col gap-2 rounded-xl bg-[color:var(--color-card)] p-3" style={{ border: "1px solid var(--color-border)" }}>
            <button className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)] px-4 py-3 text-left text-sm font-semibold">
              Profile
            </button>
            <button className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)] px-4 py-3 text-left text-sm font-semibold text-[color:var(--color-accent)]" onClick={() => setLogoutOpen(true)}>
              Logout
            </button>
          </div>
        )}
        <LogoutConfirmModel open={logoutOpen} onCancel={() => setLogoutOpen(false)} onConfirm={() => { dispatch(setSignOut()); setLogoutOpen(false); }}
        />
      </div>
    );
  }

  return (
    <>
      <Dropdown trigger={["click"]} placement="bottom" overlayClassName="delvoura-profile-dropdown delvoura-light-surface" getPopupContainer={() => document.body} overlayStyle={{ marginTop: 12 }} autoAdjustOverflow={false} open={dropdownOpen} onOpenChange={setDropdownOpen} dropdownRender={() => (
          <div className="delvoura-profile-menu">
            <div className="delvoura-profile-menu-header">
              <Avatar className="delvoura-profile-avatar delvoura-profile-avatar-lg">
                {initials}
              </Avatar>
              <div className="delvoura-profile-menu-name">
                <div className="delvoura-profile-name">{fullName}</div>
                <div className="delvoura-profile-subtitle">Welcome back</div>
              </div>
            </div>

            <button type="button" className="delvoura-profile-menu-item">
              <UserOutlined />
              Profile
            </button>

            <button
              type="button"
              className="delvoura-profile-menu-item delvoura-profile-menu-logout"
              onClick={() => {
                setDropdownOpen(false);
                setLogoutOpen(true);
              }}
            >
              <LogoutOutlined />
              Logout
            </button>
          </div>
        )}
      >
        <button type="button" className="delvoura-profile-card">
          <Avatar className="delvoura-profile-avatar">{initials}</Avatar>
          <span className="delvoura-profile-name">{fullName}</span>
          <DownOutlined className="delvoura-profile-chevron" />
        </button>
      </Dropdown>
      <LogoutConfirmModel open={logoutOpen} onCancel={() => setLogoutOpen(false)} 
        onConfirm={() => {
          dispatch(setSignOut());
          setLogoutOpen(false);
        }}
      />
    </>
  );
};

export default ProfileCard;
