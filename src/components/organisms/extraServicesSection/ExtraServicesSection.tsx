import { IExtraServicesSection } from "@/components/organisms/extraServicesSection/types";

const ExtraServicesSection = ({ className = "" }: IExtraServicesSection) => {
  return (
    <div className={`h-72 lg:h-auto ${className}`}>
      <h1 className="text-22 text-center lg:text-left lg:text-28">
        Select Our Extra Services For You
      </h1>
      <div className="flex flex-col gap-y-3 lg:gap-y-6"></div>
    </div>
  );
};

export default ExtraServicesSection;
