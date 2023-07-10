import SearchBar from "@/components/molecules/searchBar/SearchBar";

const Hero = () => {
  return (
    <div className="hero min-h-screen bg-[url(/images/hero-image.png)] ">
      <div className="hero-content text-center text-neutral-content w-full lg:w-3/4 flex flex-col z-auto">
        <h1 className="text-42 text-left lg:text-54 text-white lg:mb-3 font-missafir-semi-bold">Home wherever you go</h1>
        {/*<SearchBar />*/}
      </div>
    </div>
  );
};

export default Hero;
