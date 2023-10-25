import { IHeroSection } from "@/components/molecules/hero/types";
import Typography from "@/components/atoms/typography/Typography";

const HeroSection = ({ title }: IHeroSection) => {
  return (
    <Typography
      element="h2"
      variant="h2"
      className="text-left text-gray-800 lg:mb-3">
      {title}
    </Typography>
  );
};

export default HeroSection;
