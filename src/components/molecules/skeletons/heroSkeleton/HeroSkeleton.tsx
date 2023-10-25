const HeroSkeleton = () => {
  return (
    <div className="animate-pulse lg:w-full h-screen bg-slate-200 lg:bg-slate-50">
      <div className="lg:mt-28 mt-16 container mx-auto h-screen flex flex-col justify-center items-start lg:items-center gap-y-5 lg:gap-y-10">
        <div className="w-full lg:w-1/2 flex flex-col gap-y-3 px-3">
          <div className="h-10 bg-slate-300 lg:bg-slate-200 rounded-xl lg:w-full w-[60%]" />
          <div className="h-10 bg-slate-300 lg:bg-slate-200 rounded-xl lg:hidden w-[30%]" />
        </div>
        <div className="bg-slate-200 w-full rounded-xl gap-4 p-3 grid grid-cols-1 lg:grid-cols-3">
            <div className="h-14 bg-slate-100 rounded-xl" />
            <div className="h-14 bg-slate-100 rounded-xl" />
          <div className="grid grid-cols-4 gap-4">
            <div className="h-14 bg-slate-100 rounded-xl col-span-3" />
            <div className="h-14 bg-slate-300 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
