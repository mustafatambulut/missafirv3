"use client";
import { Suspense, useEffect, useState } from "react";
import { find, get, head, size } from "lodash";

import { BODY } from "@/app/constants";
import { useAppSelector } from "@/app/hooks";
import { IFooter } from "@/components/molecules/footer/types";

import SearchBar from "@/components/molecules/searchBar/SearchBar";
import { HERO_SECTION } from "@/components/molecules/hero/constants";

const Hero = () => {
  const [hero, setHero] = useState<IFooter>(null);

  const entities = useAppSelector((state) => state.landingReducer.entities);

  useEffect(() => {
    if (size(entities)) {
      const data = get(head(entities), BODY);
      setHero(find(data, { __component: HERO_SECTION }));
    }
  }, [entities]);

  // const SearchBar = dynamic(
  //   () => import("@/components/molecules/searchBar/SearchBar"),
  //   {
  //     suspense: false,
  //     ssr: false
  //   }
  // );

  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      {get(hero, "image") && (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${get(hero, "image")})` }}>
          <div className="w-full flex flex-col hero-content text-center text-neutral-content">
            <p className="text-42 text-left lg:text-54 text-white lg:mb-3 font-mi-semi-bold">{get(hero, "title")}</p>
            <SearchBar />
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default Hero;
