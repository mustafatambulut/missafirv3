const ListingLoadingSkeleton = () => {
  const ListingCard = ({ className = "" }: { className?: string }) => {
    return (
      <div
        className={`w-full h-auto lg:mr-4 pb-2 lg:mb-2 my-6 bg-white shadow rounded-xl ${className}`}>
        <div className="lg:w-80 w-auto h-auto">
          <div className="bg-gray-100 h-56 rounded-t-xl relative">
            <div className="flex p-3 justify-between">
              <div className="w-1/3 h-8 rounded-xl bg-gray-400" />
              <div className="w-1/5 h-8 rounded-xl bg-gray-400" />
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-200 w-full h-8 rounded-xl" />
            <div className="bg-gray-200 w-1/4 h-6 rounded-xl mt-2" />
            <div className="bg-gray-50 w-2/4 h-4 rounded-xl mt-2" />
            <div className="mt-4 flex">
              <div className="w-1/3 h-4 bg-gray-100 rounded-xl" />
              <div className="w-1/3 h-4 bg-gray-100 rounded-xl mx-2" />
              <div className="w-1/3 h-4 bg-gray-100 rounded-xl" />
            </div>
            <div className="bg-gray-400 w-2/6 h-10 rounded-xl mt-4" />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="w-full lg:col-span-4 animate-pulse p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
      <ListingCard />
      <ListingCard className="hidden lg:block" />
      <ListingCard className="hidden lg:block" />
      <ListingCard className="hidden lg:block" />
    </div>
  );
};

export default ListingLoadingSkeleton;
