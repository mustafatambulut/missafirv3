"use client";
import ReactFastMarquee from "react-fast-marquee";

const PartnersSkeleton = () => {
  const firstRow = new Array(8).fill(null);
  const secondRow = new Array(6).fill(null);

  const Partner = () => {
    return (
      <div className="bg-gray-50 rounded-lg h-20 lg:h-28 w-40 lg:w-60 mx-2"></div>
    );
  };

  return (
    <div className="py-28 animate-pulse">
      <div className="text-center px-4">
        <div className="w-[55%] lg:h-12 h-7 rounded-lg bg-gray-200 mx-auto" />
        <div className="w-[75%] h-5 rounded-md bg-gray-100 mx-auto lg:mt-8 mt-5" />
        <div className="w-[60%] h-5 rounded-md bg-gray-100 mx-auto lg:mt-4 mt-2" />
      </div>
      <div className="mx-3 mt-10 flex flex-col gap-y-3">
        <ReactFastMarquee>
          {firstRow.map((i, key) => (
            <Partner key={key} />
          ))}
        </ReactFastMarquee>
        <ReactFastMarquee direction="right">
          {secondRow.map((i, key) => (
            <Partner key={key} />
          ))}
        </ReactFastMarquee>
      </div>
    </div>
  );
};

export default PartnersSkeleton;
