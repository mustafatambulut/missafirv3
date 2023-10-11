const TechExperienceSkeleton = () => {
  const dummyData = new Array(3).fill(null);

  const Experience = () => {
    return (
      <>
        <div className="w-1/4">
          <div className="w-full h-6 bg-gray-100 rounded-md" />
        </div>
      </>
    );
  };

  const handleListingCard = () => {
    return (
      <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center gap-10">
        <div className="bg-gray-100 rounded-lg h-96 w-80"></div>

        <div className="w-72 flex flex-col items-center gap-y-5">
          <div className="flex flex-col items-center gap-y-1 w-full">
            <div className="bg-gray-200 w-[65%] h-6 rounded-md" />
            <div className="bg-gray-200 w-[80%] h-6 rounded-md" />
            <div className="bg-gray-200 w-[100%] h-6 rounded-md" />
            <div className="bg-gray-200 w-[100%] h-6 rounded-md" />
            <div className="bg-gray-200 w-[50%] h-6 rounded-md" />
          </div>

          <div className="flex flex-col items-center gap-y-1 w-full">
            <div className="bg-gray-100 w-[65%] h-6 rounded-md" />
            <div className="bg-gray-100 w-[45%] h-6 rounded-md" />
            <div className="bg-gray-100 w-[80%] h-6 rounded-md" />
            <div className="bg-gray-100 w-[100%] h-6 rounded-md" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-28 animate-pulse">
      <div className="text-center px-4">
        <div className="w-[40%] lg:h-12 h-7 rounded-lg bg-gray-200 mx-auto mb-2" />
        <div className="w-[60%] lg:h-12 h-7 rounded-lg bg-gray-200 mx-auto" />
        <div className="w-[90%] h-5 rounded-md bg-gray-100 mx-auto lg:mt-4 mt-2" />
        <div className="lg:hidden w-2/4 lg:h-8 h-4 rounded-xl bg-gray-200 mx-auto lg:mt-4 mt-2" />
        <div className="lg:hidden w-2/6 lg:h-8 h-4 rounded-xl bg-gray-200 mx-auto lg:mt-4 mt-2" />
      </div>
      <div className="mx-3 mt-6">
        <div className="bg-white flex items-center justify-center gap-x-20 px-4 w-full my-20">
          {dummyData.map((i, key) => (
            <Experience key={key} />
          ))}
        </div>
        <div>{handleListingCard()}</div>
      </div>
    </div>
  );
};

export default TechExperienceSkeleton;
