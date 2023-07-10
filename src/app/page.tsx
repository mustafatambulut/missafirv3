// import Body from "@/components/organisms/body/Body";
// import { BODY, HOME } from "@/app/constants";
// import { getPageDataByComponent } from "@/utils/helper";

import Hero from "@/components/molecules/hero/Hero";

const Home = () => {
  // const { logo, buttons, langMenu, userMenu } = (await getPageDataByComponent(
  //   HOME,
  //   BODY
  // )) as IHome;
  return (
    <div>
      <Hero />
    </div>
  );
};

export default Home;
