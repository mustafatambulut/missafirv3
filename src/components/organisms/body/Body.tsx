import dynamic from "next/dynamic";

const Body = async () => {
  const Hero = dynamic(() => import("@/components/molecules/hero/Hero"), {
    suspense: false
  });

  return (
    <div>
      <Hero />
    </div>
  );
};
export default Body;
