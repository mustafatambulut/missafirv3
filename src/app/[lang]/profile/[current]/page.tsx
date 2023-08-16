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
        return <div>Settings</div>;
      default:
        return <div>Info</div>;
    }
  };
  return renderActiveSection();
};

export default Page;
