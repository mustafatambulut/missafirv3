import ProfileSidebar from "@/components/molecules/profileSidebar/ProfileSidebar";
import ProfileContent from "@/components/molecules/profileContent/ProfileContent";

const Profile = () => {
  return (
    <div className="pt-16 lg:pt-40 px-5 lg:px-40">
      {/*todo: dil seçeneği ekleyince güncellenecek*/}
      <h1 className="text-42 mb-10 hidden lg:block">Profil</h1>
      <div className="tab-container flex flex-col lg:flex-row lg:gap-x-7">
        <ProfileSidebar />
        <ProfileContent />
      </div>
    </div>
  );
};

export default Profile;
