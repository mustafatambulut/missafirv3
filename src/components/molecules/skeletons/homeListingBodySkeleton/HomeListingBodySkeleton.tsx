import { isMobile } from "react-device-detect";

const HomeListingBodySkeleton = () => {
  const dummyData = new Array(4).fill(null);
  const mobilDummyData = new Array(3).fill(null);

  const iterableData = isMobile ? mobilDummyData : dummyData;

  const ListingCard = () => {
    return (
      <div className=" w-full h-auto bg-white shadow rounded-xl">
        <div className="w-full h-auto">
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
    <div className="animate-pulse grid grid-cols-1 lg:grid-cols-4 gap-5 mt-4">
      {iterableData.map((i, key) => (
        <ListingCard key={key} />
      ))}
    </div>
  );
};

export default HomeListingBodySkeleton;
