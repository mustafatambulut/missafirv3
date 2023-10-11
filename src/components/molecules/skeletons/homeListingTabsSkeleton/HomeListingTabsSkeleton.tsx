import { isMobile } from "react-device-detect";

const HomeListingTabsSkeleton = () => {
  const dummyData = new Array(10).fill(null);
  const mobilDummyData = new Array(3).fill(null);

  const iterableData = isMobile ? mobilDummyData : dummyData;

  const CatName = () => {
    return (
      <>
        <div className="flex w-full mx-5 lg:mx-0 flex-col justify-center items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-xl" />
          <div className="w-12 h-6 bg-gray-100 rounded-xl mt-2" />
        </div>
      </>
    );
  };

  return (
    <div className="flex w-full h-full flex-nowrap overflow-x-scroll animate-pulse">
      {iterableData.map((i, key) => (
        <CatName key={key} />
      ))}
    </div>
  );
};

export default HomeListingTabsSkeleton;
