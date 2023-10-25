import { find, forEach, get } from "lodash";
import dynamic from "next/dynamic";

import { PREMIUM_SECTION } from "@/components/atoms/premium/constants";
import { BENEFIT_OWNER_SECTION } from "@/components/atoms/benefitOwner/constants";
import { HERO_SECTION } from "@/components/molecules/hero/constants";
import { CITY_SECTION } from "@/components/molecules/cities/constants";
import { PARTNER_SECTION } from "@/components/molecules/partner/constants";
import { INFO_SECTION } from "@/components/molecules/infoSection/constants";
import { TESTIMONIAL_SECTION } from "@/components/molecules/testimonial/constants";

const Premium = dynamic(() => import("@/components/atoms/premium/Premium"));
const BenefitOwner = dynamic(
  () => import("@/components/atoms/benefitOwner/BenefitOwner")
);
const Hero = dynamic(() => import("@/components/molecules/hero/Hero"), {
  ssr: false
});
const News = dynamic(() => import("@/components/molecules/news/News"));
const Cities = dynamic(() => import("@/components/molecules/cities/Cities"));
const Partner = dynamic(() => import("@/components/molecules/partner/Partner"));
const HeroSection = dynamic(
  () => import("@/components/molecules/hero/HeroSection")
);
const InfoSection = dynamic(
  () => import("@/components/molecules/infoSection/InfoSection")
);
const Testimonial = dynamic(
  () => import("@/components/molecules/testimonial/Testimonial")
);
const ListingDetail = dynamic(
  () => import("@/components/molecules/listingDetail/ListingDetail")
);

const Home = async ({ params }) => {
  // @ts-ignore
  const { data } = await import(
    `../../../public/data/home_${get(params, "lang")}.json`
  );

  const bulkData = {};

  const sections = [
    CITY_SECTION,
    HERO_SECTION,
    PREMIUM_SECTION,
    TESTIMONIAL_SECTION,
    PARTNER_SECTION,
    BENEFIT_OWNER_SECTION,
    INFO_SECTION
  ];
  const dataNames = [
    "cities",
    "hero",
    "premium",
    "testimonials",
    "partners",
    "benefit",
    "info"
  ];

  forEach(sections, (section, i) => {
    bulkData[dataNames[i]] = find(get(data, "attributes.body"), {
      __component: section
    });
  });

  const { cities, hero, premium, testimonials, partners, benefit, info } =
    bulkData;

  return (
    <div>
      <Hero hero={hero}>
        <HeroSection title={get(hero, "title")} />
      </Hero>
      <Cities cities={cities} />
      <ListingDetail lang={get(params, "lang")} />
      <Premium premium={premium} />
      {/*<TechExperience/>*/}
      <Testimonial testimonials={testimonials} />
      <Partner partners={partners} />
      <BenefitOwner benefit={benefit} />
      <News lang={get(params, "lang")} />
      <InfoSection info={info} />
    </div>
  );
};

export default Home;
