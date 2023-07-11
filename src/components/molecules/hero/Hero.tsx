import { find, get } from "lodash";
import dynamic from "next/dynamic";

import { BODY, HOME } from "@/app/constants";
import { getPageDataByComponent } from "@/utils/helper";
import { IHero } from "@/components/molecules/hero/types";
import { HERO_SECTION } from "@/components/molecules/hero/constants";

const Hero = async () => {
  const data = (await getPageDataByComponent(HOME, BODY)) as IHero;
  const hero = find(data, { __component: HERO_SECTION });

  const SearchBar = dynamic(
    () => import("@/components/molecules/searchBar/SearchBar"),
    {
      suspense: false,
      ssr: false
    }
  );

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${get(hero, "image")})` }}>
      <div className="w-full flex flex-col hero-content text-center text-neutral-content">
        <p className="text-42 text-left lg:text-54 text-white lg:mb-3 font-mi-semi-bold">
          {get(hero, "title")}
        </p>
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
