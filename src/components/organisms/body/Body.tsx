import dynamic from "next/dynamic";
import Premium from "@/components/atoms/premium/Premium";
import Cities from "@/components/molecules/cities/Cities";
import Hero from "@/components/molecules/hero/Hero";

const Body = () => {
  return (
    <div>
      <Hero />
      <Premium />
      <Cities />
    </div>
  );
};
export default Body;
