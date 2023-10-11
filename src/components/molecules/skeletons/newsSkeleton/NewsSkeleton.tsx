import { isMobile } from "react-device-detect";

const NewsSkeleton = () => {
  const dummyData = new Array(4).fill(null);
  const mobilDummyData = new Array(3).fill(null);

  const iterableData = isMobile ? mobilDummyData : dummyData;

  const NewsCard = () => {
    return (
      <div className="w-full h-auto mr-4 pb-2 lg:mb-2 my-6 bg-white shadow rounded-xl">
        <div className="w-full h-auto">
          <div className="bg-gray-100 h-56 rounded-t-xl relative">
            <div className="flex p-3 justify-between">
              <div className="w-1/3 h-8 rounded-xl bg-gray-400" />
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-50 w-1/4 h-4 rounded-sm mb-2" />
            <div className="bg-gray-200 w-full h-6 rounded-md" />
            <div className="bg-gray-200 w-1/4 h-6 rounded-md mt-2" />
            <div className="mt-4 flex flex-col gap-y-1">
              <div className="w-[90%] h-4 bg-gray-100 rounded-sm" />
              <div className="w-[80%] h-4 bg-gray-100 rounded-sm" />
              <div className="w-[60%] h-4 bg-gray-100 rounded-sm" />
            </div>
            <div className="flex mt-4 gap-x-4">
              <div className="bg-gray-200 w-11 h-5 rounded-md" />
              <div className="bg-gray-200 w-11 h-5 rounded-md" />
              <div className="bg-gray-200 w-11 h-5 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-28 animate-pulse">
      <div className="text-center px-4">
        <div className="w-60 h-9 rounded-lg bg-gray-200 mx-auto mb-5" />
        <div className="lg:w-[670px] w-3/4 h-5 rounded-md bg-gray-100 mx-auto mb-2" />
        <div className="lg:w-[466px] w-2/4 h-5 rounded-md bg-gray-100 mx-auto" />
      </div>
      <div className="mx-3 mt-6">
        <div className="px-3 lg:mt-2 flex m w-full overflow-x-scroll">
          {iterableData.map((i, key) => (
            <NewsCard key={key} />
          ))}
        </div>
        {isMobile ? (
          <div className="mx-3 rounded-xl mt-4 h-14 bg-gray-200" />
        ) : null}
      </div>
      <div className="w-full flex justify-center">
        <div className="w-48 h-12 rounded-xl bg-gray-200 my-5"></div>
      </div>
    </div>
  );
};

export default NewsSkeleton;
