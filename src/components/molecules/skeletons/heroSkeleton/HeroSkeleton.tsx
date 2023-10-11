const HeroSkeleton = () => {
  return (
    <div className="animate-pulse lg:w-full h-[780px] bg-slate-50">
      <div className="lg:py-80 py-24 container mx-auto">
        <div className="bg-slate-200 w-full rounded-xl lg:h-20 h-auto lg:mx-0 py-10 lg:py-o lg:flex flex-none lg:justify-between justify-start">
          <div className="px-2 lg:flex flex-none items-center">
            <div className="lg:w-64 w-full h-14 bg-slate-100 rounded-xl" />
            <div className="lg:w-40 w-full h-14 bg-slate-100 rounded-xl lg:ml-4 ml-0 mt-4 lg:mt-0" />
          </div>
          <div className="px-2 lg:flex flex-none items-center">
            <div className="lg:w-40 w-full h-14 bg-slate-100 rounded-xl lg:ml-4 ml-0 mt-4 lg:mt-0" />
            <div className="lg:w-40 w-full h-14 bg-slate-300 rounded-xl lg:ml-4 ml-0 mt-4 lg:mt-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
