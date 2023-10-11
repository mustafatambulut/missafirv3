const InboxThreadListingSkeleton = () => {
  return (
    <div className=" w-full rounded-xl shadow-base-blur-5 h-full animate-pulse">
      <div className="w-full w-auto h-auto">
        <div className="bg-gray-100 h-56 rounded-t-xl relative">
          <div className="flex p-3 justify-between">
            <div className="w-1/3 h-8 rounded-xl bg-gray-400" />
            <div className="w-1/5 h-8 rounded-xl bg-gray-400" />
          </div>
        </div>
        <div className="p-4">
          <div className="bg-gray-100 w-[30%] h-7 rounded-lg" />
          <div className="bg-gray-200 w-full h-5 rounded-md my-2" />
          <div className="bg-gray-200 w-[50%] h-5 rounded-md" />
          <div className="bg-gray-50 w-[40%] h-4 rounded mt-2" />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex gap-2">
              <div className="bg-gray-100 h-5 w-5 rounded-full" />
              <div className="flex flex-col w-full gap-y-1">
                <div className="bg-gray-100 w-full h-5 rounded-lg" />
                <div className="bg-gray-100 w-full h-5 rounded-lg" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="bg-gray-100 h-5 w-5 rounded-full" />
              <div className="flex flex-col w-full gap-y-1">
                <div className="bg-gray-100 w-full h-5 rounded-lg" />
                <div className="bg-gray-100 w-full h-5 rounded-lg" />
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="w-[60%] h-6 bg-gray-200 rounded-lg" />
            <div className="w-[20%] h-9 bg-gray-300 rounded-lg" />
          </div>
          <div className="mt-4 flex items-center gap-x-2">
            <div className="w-20 h-5 bg-gray-300 rounded-md" />
            <div className="w-5 h-5 bg-gray-300 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxThreadListingSkeleton;
