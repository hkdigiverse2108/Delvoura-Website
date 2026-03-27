import { Avatar, Progress, Typography } from "antd";

const { Text, Title } = Typography;

interface ProfileHeaderCardProps {
  onEdit?: () => void;
  user?: unknown;
}

const getInitials = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return `${first}${last}`.toUpperCase() || "U";
};

const ProfileHeaderCard = ({onEdit,user: userProp,}: ProfileHeaderCardProps) => {
  const user =userProp ?? {};

  const fullName = (user as { name?: string })?.name || (user as { fullName?: string })?.fullName || [  (user as { firstName?: string })?.firstName,  (user as { lastName?: string })?.lastName, ].filter(Boolean).join(" ").trim() ||"User";
  const initials = getInitials(fullName);
  const email = (user as { email?: string })?.email ?? "--";
  const phone = (user as { phone?: string })?.phone ?? (user as { phoneNumber?: string })?.phoneNumber ?? (user as { mobile?: string })?.mobile ??(() => { const contact = (user as { contact?: { countryCode?: string; phoneNo?: number | string } })?.contact; if (!contact?.phoneNo) return ""; return `${contact.countryCode ?? ""} ${contact.phoneNo}`.trim(); })();
  const phoneStatus = (user as { phoneVerificationStatus?: string })?.phoneVerificationStatus;
  const explicitVerified =  (user as { isPhoneVerified?: boolean })?.isPhoneVerified ??  (user as { phoneVerified?: boolean })?.phoneVerified ??  (user as { verifiedPhone?: boolean })?.verifiedPhone ??  (typeof phoneStatus === "string" ? phoneStatus.toLowerCase() === "verified" : undefined);
  const phoneVerified = explicitVerified ?? !!phone;
  const profileStrength = (user as { profileStrength?: number })?.profileStrength ?? 0;

  return (
    <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col items-start gap-4 text-left sm:flex-row sm:items-center">
        <div className="profile-avatar-ring">
          <Avatar size={80} className="bg-[color:var(--color-accent)] text-lg font-semibold text-white" >{initials}</Avatar>
          <span className="profile-strength-badge">{profileStrength}%</span>
        </div>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <Title level={4} className="!mb-0">{fullName}</Title>
            <Progress type="circle" percent={profileStrength} size={44} strokeWidth={10} format={(percent) => `${percent}%`} strokeColor="#eb4a2e" trailColor="#f1f1f1" />
          </div>
          <Text className="block text-[color:var(--color-text-muted)]">Email : {email}</Text>
          <Text className="block text-[color:var(--color-text-muted)]">
            Phone : {phone}
            <span className={`ml-2 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${ phoneVerified ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700" }`} >
               {phoneVerified ? "Verified" : "Pending"}
            </span>
          </Text>
        </div>
      </div>
      
      <button className="absolute right-0 top-0 rounded-[15px] border border-[color:var(--color-border)] px-4 py-2 text-sm font-medium text-[color:var(--color-text)] profile-action-edit" type="button" onClick={onEdit} >
        Edit
      </button>
    </div>
  );
};

export default ProfileHeaderCard;
