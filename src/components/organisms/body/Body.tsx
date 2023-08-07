import Premium from "@/components/atoms/premium/Premium";
import BenefitOwner from "@/components/atoms/benefitOwner/BenefitOwner";
import News from "@/components/molecules/news/News";
import Hero from "@/components/molecules/hero/Hero";
import Cities from "@/components/molecules/cities/Cities";
import Partners from "@/components/molecules/partners/Partners";
import InfoSection from "@/components/molecules/infoSection/InfoSection";
import Testimonials from "@/components/molecules/testimonials/Testimonials";
import ListingDetails from "@/components/molecules/listingDetail/ListingDetails";
import TechExperience from "@/components/molecules/techExperience/TechExperience";

const Body = () => {
  return (
    <div>
      <Hero />
      <Cities />
      <ListingDetails />
      <Premium />
      <TechExperience />
      <Testimonials />
      <Partners />
      <BenefitOwner />
      <News />
      <InfoSection collapsable={true} />
    </div>
  );
};
export default Body;
