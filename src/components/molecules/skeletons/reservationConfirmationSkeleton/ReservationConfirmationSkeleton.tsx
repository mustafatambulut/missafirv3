const ReservationConfirmationSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="lg:flex flex-col items-start gap-y-6 hidden ">
        <div className="w-[30%] h-8 rounded-lg bg-gray-200" />
        <div className="grid grid-cols-2 gap-x-4 w-full">
          <div className="bg-gray-100 h-60 rounded-20" />
          <div className="bg-gray-100 h-60 rounded-20" />
        </div>
        <div className="w-[60%] h-8 rounded-lg bg-gray-200" />
        <div className="w-[60%] h-5 rounded-lg bg-gray-50" />
        <div className="w-[30%] grid grid-cols-3 gap-x-4">
          <div className="h-4 rounded-lg bg-gray-100" />
          <div className="h-4 rounded-lg bg-gray-100" />
          <div className="h-4 rounded-lg bg-gray-100" />
        </div>
      </div>

      <div className="lg:hidden grid grid-cols-1">
        <div className="bg-gray-200 w-[30%] h-6 mb-3 rounded-lg" />
        <div className="bg-gray-100 w-full h-44 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-2 mt-4">
          <div className="col-span-2 grid grid-cols-1 gap-y-3">
            <div className="bg-gray-50 rounded-lg h-4 w-[70%]"></div>
            <div className="bg-gray-200 rounded-lg h-6 w-[90%]"></div>
            <div className="grid gap-2 grid-cols-3 w-[40%]">
              <div className="bg-gray-100 rounded-md h-5"></div>
              <div className="bg-gray-100 rounded-md h-5"></div>
              <div className="bg-gray-100 rounded-md h-5"></div>
            </div>
          </div>
          <div className="w-full shadow rounded-20 flex p-4 mt-4 items-center gap-x-3">
            <div className="flex flex-col flex-1">
              <div className="bg-gray-200 rounded-lg h-5 w-full mb-3"></div>
              <div className="bg-gray-100 rounded-3xl h-4 w-[50%]"></div>
            </div>
            <div className="bg-gray-200 rounded-md h-[18px] w-[18px]" />
            <div className="flex flex-col flex-1">
              <div className="bg-gray-200 rounded-lg h-5 w-full mb-3"></div>
              <div className="bg-gray-100 rounded-3xl h-4 w-[50%]"></div>
            </div>
            <div className="bg-gray-200 rounded-md h-[18px] w-[18px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmationSkeleton;
