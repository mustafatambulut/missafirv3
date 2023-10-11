import { ISustainabilityLayout } from "@/app/[lang]/sustainability/types";

const SustainabilityLayout = ({ children }: ISustainabilityLayout)=> {
  return <section>{children}</section>;
};

export default SustainabilityLayout;
