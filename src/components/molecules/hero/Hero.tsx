"use client";
import { useEffect, useState } from "react";
import { find, get, head, size } from "lodash";
import { isMobile } from "react-device-detect";

import { BODY } from "@/app/constants";
import { useAppSelector } from "@/redux/hooks";
import { IFooter } from "@/components/molecules/footer/types";
import { HERO_SECTION } from "@/components/molecules/hero/constants";

import Loading from "@/components/atoms/loading/Loading";
import SearchBar from "@/components/molecules/searchBar/SearchBar";
import MobileSearchBar from "@/components/molecules/mobileSearchBar/MobileSearchBar";

const Hero = () => {
  const [hero, setHero] = useState<IFooter>(null);

  const entities = useAppSelector((state) => state.landingReducer.entities);

  useEffect(() => {
    if (size(entities)) {
      const data = get(head(entities), BODY);
      setHero(find(data, { __component: HERO_SECTION }));
    }
  }, [entities]);

  return (
    <Loading isLoading={!get(hero, "image")} loader={<p>Loading feed...</p>}>
      {/*todo: skeleton eklenecek*/}
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${get(hero, "image")})` }}>
        <div className="w-full flex flex-col hero-content text-center text-neutral-content">
          <p className="text-42 text-left lg:text-54 text-white lg:mb-3 font-mi-semi-bold">
            {get(hero, "title")}
          </p>
          {isMobile ? <MobileSearchBar /> : <SearchBar />}
        </div>
      </div>
    </Loading>
  );
};

export default Hero;
