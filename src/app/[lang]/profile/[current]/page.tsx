import dynamic from "next/dynamic";

const ProfileInfo = dynamic(
  () => import("@/components/molecules/profileInfo/ProfileInfo"),
  { ssr: false }
);
const Settings = dynamic(
  () => import("@/components/molecules/settings/Settings"),
  { ssr: false }
);
const ChangePassword = dynamic(
  () => import("@/components/molecules/changePassword/ChangePassword"),
  { ssr: false }
);

const Page = ({ params }: any) => {
  const { current } = params;
  const renderActiveSection = () => {
    switch (current) {
      case "password":
        return <ChangePassword />;
      case "reviews":
        return <div>Reviews</div>;
      case "wishlist":
        return <div>Wishlist</div>;
      case "settings":
        return <Settings />;
      default:
        return <ProfileInfo />;
    }
  };
  return renderActiveSection();
};

export default Page;
