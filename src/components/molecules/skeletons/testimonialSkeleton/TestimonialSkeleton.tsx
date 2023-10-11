const TestimonialSkeleton = () => {
  const dummyData = new Array(3).fill(null);

  const Testimonial = () => {
    return <div className="bg-gray-100 rounded-lg h-96 w-80"></div>;
  };

  return (
    <div className="py-28 animate-pulse">
      <div className="text-center px-4">
        <div className="w-[60%] lg:h-12 h-7 rounded-lg bg-gray-200 mx-auto" />
        <div className="w-[65%] h-5 rounded-md bg-gray-100 mx-auto lg:mt-8 mt-5" />
        <div className="w-[55%] h-5 rounded-md bg-gray-100 mx-auto lg:mt-4 mt-2" />
        <div className="w-[75%] h-5 rounded-md bg-gray-100 mx-auto lg:mt-4 mt-2" />
      </div>
      <div className="mx-3 mt-6">
        <div className="bg-white flex flex-col lg:flex-row gap-y-5 items-center justify-center gap-x-20 px-4 w-full my-20">
          {dummyData.map((i, key) => (
            <Testimonial key={key} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSkeleton;
