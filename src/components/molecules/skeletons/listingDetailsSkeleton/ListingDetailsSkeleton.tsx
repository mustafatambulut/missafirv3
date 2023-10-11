const ListingDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 animate-pulse">
      <div className="grid grid-rows-3 lg:grid-rows-2 grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="bg-gray-100 w-full h-96  col-span-2 row-span-3 lg:row-span-2 relative">
          <div className="w-100 absolute top-0 left-0 justify-between items-center w-full p-5 flex lg">
            <div className="w-20 h-9 bg-gray-300 rounded-md"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
          </div>
        </div>
        <div className="bg-gray-100 w-full hidden lg:block" />
        <div className="bg-gray-100 w-full hidden lg:block" />
        <div className="bg-gray-100 w-full hidden lg:block" />
        <div className="bg-gray-100 w-full hidden lg:block" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-2 p-5">
        <div className="col-span-2 grid grid-cols-1 gap-y-3">
          <div className="bg-gray-50 rounded-lg h-8 w-[70%]"></div>
          <div className="bg-gray-200 rounded-lg h-8 w-[90%]"></div>
          <div className="grid gap-2 grid-cols-3 w-[40%]">
            <div className="bg-gray-100 rounded-md h-6"></div>
            <div className="bg-gray-100 rounded-md h-6"></div>
            <div className="bg-gray-100 rounded-md h-6"></div>
          </div>
        </div>
        <div className="w-full shadow rounded-20 grid grid-cols-1 p-4 mt-3 lg:mt-0">
          <div className="bg-gray-200 rounded-lg h-6 w-[20%] mb-3"></div>
          <div className="bg-gray-100 rounded-3xl h-10 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsSkeleton;
