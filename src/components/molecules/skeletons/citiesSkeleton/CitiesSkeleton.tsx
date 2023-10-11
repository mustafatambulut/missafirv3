const CitiesSkeleton = () => {
  const dummyData = new Array(10).fill(null);

  const CityCard = () => {
    return (
      <div className="bg-white border-gray-100 border-1 h-auto rounded-2xl shadow p-5 lg:mx-3 mx-2">
        <div className=" bg-gray-100 lg:w-60 w-40 flex min-h-[170px] border-gray-200 border-2 rounded-xl" />
        <div className="w-24 lg:h-10 h-6 mt-4 bg-gray-200 rounded-xl" />
        <div className="w-16 lg:h-10 h-6 mt-2 bg-gray-100 rounded-xl" />
      </div>
    );
  };

  return (
    <div className="animate-pulse">
      <div className="container mx-auto py-4 mt-[160px] items-center">
        <div className="w-60 lg:h-12 h-7 rounded-xl bg-gray-200 mx-auto" />
        <div className="lg:w-[670px] w-3/4 lg:h-8 h-4 rounded-xl bg-gray-200 mx-auto lg:mt-4 mt-2" />
        <div className="lg:w-[466px] w-2/4 lg:h-8 h-4 rounded-xl bg-gray-200 mx-auto lg:mt-4 mt-2" />
        <div className="lg:hidden w-2/4 lg:h-8 h-4 rounded-xl bg-gray-200 mx-auto lg:mt-4 mt-2" />
        <div className="lg:hidden w-2/6 lg:h-8 h-4 rounded-xl bg-gray-200 mx-auto lg:mt-4 mt-2" />
      </div>
      <div className="mt-6 py-2 w-full flex overflow-x-auto lg:overflow-x-scroll lg:pl-10 pl-4">
        {dummyData.map((i, key) => (
          <CityCard key={key} />
        ))}
      </div>
    </div>
  );
};

export default CitiesSkeleton;
