import Premium from "@/components/atoms/premium/Premium";
import BenefitOwner from "@/components/atoms/benefitOwner/BenefitOwner";
import News from "@/components/molecules/news/News";
import Hero from "@/components/molecules/hero/Hero";
import Cities from "@/components/molecules/cities/Cities";
import Partner from "@/components/molecules/partner/Partner";
import Testimonial from "@/components/molecules/testimonial/Testimonial";
import InfoSection from "@/components/molecules/infoSection/InfoSection";
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
      <Testimonial />
      <Partner />
      <BenefitOwner />
      <News />
      <InfoSection />
    </div>
  );
};
export default Body;
