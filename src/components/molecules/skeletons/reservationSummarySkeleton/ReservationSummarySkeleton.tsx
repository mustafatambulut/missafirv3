const ReservationSummarySkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="hidden lg:flex flex-col gap-y-6">
        <div className="w-[30%] h-8 rounded-lg bg-gray-200" />
        <div className="flex flex-col gap-y-4 w-full">
          <div className="w-full flex justify-between items-center">
            <div className="w-[45%] h-6 rounded-lg bg-gray-200" />
            <div className="w-[6%] h-6 rounded-lg bg-gray-200" />
          </div>
          <div className="flex flex-col gap-y-3 w-full">
            <div className="w-full flex justify-between items-center">
              <div className="w-[30%] h-3.5 rounded bg-gray-100" />
              <div className="w-[20%] h-3.5 rounded bg-gray-200" />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="w-[30%] h-3.5 rounded bg-gray-100" />
              <div className="w-[20%] h-3.5 rounded bg-gray-200" />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="w-[30%] h-3.5 rounded bg-gray-100" />
              <div className="w-[20%] h-3.5 rounded bg-gray-200" />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="w-[30%] h-3.5 rounded bg-gray-100" />
              <div className="w-[20%] h-3.5 rounded bg-gray-200" />
            </div>
          </div>
          <div className="flex justify-between w-full border-t pt-2 border-t-gray-100">
            <div className="w-full flex flex-col items-start gap-y-1">
              <div className="w-[90%] h-6 rounded bg-gray-100" />
              <div className="w-[70%] h-6 rounded bg-gray-200" />
            </div>
            <div className="w-full flex flex-col items-end gap-y-1">
              <div className="w-[40%] h-[18px] rounded bg-gray-100" />
              <div className="w-[60%] h-[34px] rounded bg-gray-200" />
            </div>
          </div>
          <div className="w-full h-12 rounded-lg bg-gray-200" />
        </div>
      </div>
      <div className="flex lg:hidden justify-between">
        <div className="flex flex-col w-[40%] gap-y-1">
          <div className="flex w-full gap-x-2">
            <div className="w-[80%] h-4 rounded bg-gray-200" />
            <div className="w-[10%] h-4 rounded bg-gray-200" />
          </div>
          <div className="w-full h-8 rounded bg-gray-200" />
        </div>
        <div className="w-[30%] rounded-lg bg-gray-200" />
      </div>
    </div>
  );
};

export default ReservationSummarySkeleton;
