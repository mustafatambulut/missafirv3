import dynamic from "next/dynamic";
import Premium from "@/components/atoms/premium/Premium";
import Cities from "@/components/molecules/cities/Cities";

const Body = async () => {
  const Hero = dynamic(() => import("@/components/molecules/hero/Hero"), {
    suspense: false
  });

  return (
    <div>
      <Hero />
      <Premium />
      <Cities />
    </div>
  );
};
export default Body;
