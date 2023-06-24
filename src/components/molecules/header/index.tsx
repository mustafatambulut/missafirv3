import { getDummyDataByType } from "@/utils/helper";

import Navbar from "@/components/molecules/navbar";

const Header = async () => {
  //const links = await getMenuByComponent(HEADER_MENU);
  //const data = await getPageDataByComponent(currentPage, PAGE_HEADER);
  const dummyNavbarItems = getDummyDataByType("dummyNavbarItems");
  return (
    // <div className="p-4 flex justify-between bg-yellow-200">
    //   <div>
    //     <img
    //       width={200}
    //       src={`${process.env.API_URL_DEV}${get(
    //         get(data, "logo"),
    //         "data.attributes.url"
    //       )}`}
    //       alt="image"
    //     />
    //   </div>
    //   <Menu links={links} />
    // </div>
    <div className="fixed top-0 w-full">
      <Navbar navbarItems={dummyNavbarItems} />
    </div>
  );
};
export default Header;
