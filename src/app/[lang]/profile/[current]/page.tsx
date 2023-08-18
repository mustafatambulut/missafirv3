import ProfileInfo from "@/components/molecules/profileInfo/ProfileInfo";
import Settings from "@/components/molecules/settings/Settings";

const Page = ({ params }: any) => {
  const { current } = params;
  const renderActiveSection = () => {
    switch (current) {
      case "password":
        return <div>Password</div>;
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
