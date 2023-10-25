import dynamic from "next/dynamic";

const ProfileInfo = dynamic(
  () => import("@/components/molecules/profileInfo/ProfileInfo"),
  { ssr: false }
);

const Profile = () => {
  return <ProfileInfo />;
};

export default Profile;
