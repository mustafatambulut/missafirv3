const BannerSkeleton = () => {
  return (
    <div className=" w-full h-auto px-4 lg:px-8 my-5 animate-pulse">
      <div className="bg-gray-50 rounded-20 p-6 lg:p-10">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="w-[85%] lg:w-1/3 h-8 rounded-md bg-gray-200" />
          <div className="lg:hidden mt-2 w-1/3 h-8 rounded-md bg-gray-200" />
        </div>
        <div className="my-8 flex flex-col gap-y-3">
          <div className="bg-gray-100 rounded-md w-[75%] h-3.5 lg:h-7" />
          <div className="bg-gray-100 rounded-md w-[35%] h-3.5 lg:h-7" />
          <div className="lg:hidden bg-gray-100 rounded-md w-[75%] h-3.5 lg:h-7" />
          <div className="lg:hidden bg-gray-100 rounded-md w-[35%] h-3.5 lg:h-7" />
        </div>
        <div className="bg-gray-200 h-12 w-40 rounded-xl"></div>
      </div>
    </div>
  );
};

export default BannerSkeleton;
