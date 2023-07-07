import { HomeTypes } from "@/app/types";
import { BODY, HOME } from "@/app/constants";
import { getPageDataByComponent } from "@/utils/helper";

const Home = async () => {
  /*eslint-disable*/
  const { logo, buttons, langMenu, userMenu } = (await getPageDataByComponent(
    HOME,
    BODY
  )) as HomeTypes;
  return <div>home page</div>;
};

export default Home;
