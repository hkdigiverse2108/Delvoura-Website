import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import ProfileTabs from "../../Components/Profile/ProfileTabs";

const ProfilePage = () => {
  return (
    <div className="profile-page min-h-screen bg-[color:var(--color-card)] text-[color:var(--color-text)]">
      <div className="sticky top-0 z-[550] w-full">
        <Header />
      </div>

      <section className="profile-content mx-auto flex w-[95%] max-w-none flex-col gap-6 py-10">
        <ProfileTabs />
      </section>

      <AppFooter />
    </div>
  );
};

export default ProfilePage;
