import SearchBar from "@/components/molecules/searchBar";

const Hero = () => {
  return (
    <div className="hero min-h-screen bg-[url(/images/hero-image.png)] ">
      <div className="hero-content text-center text-neutral-content w-full lg:w-3/4 flex flex-col z-auto">
        <h1 className="text-[47px] text-left lg:text-5xl font-bold text-white lg:mb-3">Home wherever you go</h1>
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
