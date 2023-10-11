const InfoSkeleton = () => {
  return (
    <div className=" w-full h-auto px-4 lg:px-8 my-5 animate-pulse">
      <div className="bg-gray-100 rounded-20">
        <div className="flex flex-col lg:flex-row lg:justify-between bg-gray-50 p-6 rounded-t-20">
          <div className="w-[85%] lg:w-1/3 h-7 rounded-md bg-gray-200" />
          <div className="h-6 w-6 rounded-md bg-gray-200" />
        </div>
        <div className="flex flex-col gap-y-3 p-6">
          <div className="bg-gray-200 rounded-md w-[75%] h-5" />
          <div className="bg-gray-200 rounded-md w-[35%] h-5" />
        </div>
      </div>
    </div>
  );
};

export default InfoSkeleton;
