import { ReactNode } from "react";
import { map } from "lodash";

const FooterSkeleton = () => {
  const ItemComponent = ({ itemLength }: number): ReactNode => {
    return (
      <div className="flex flex-col gap-y-3 w-[12%]">
        <div className="w-[50%] h-3 rounded bg-gray-200" />
        {map(Array.from(Array(itemLength)), (item, key) => (
          <div key={key} className="w-full h-5 rounded-md bg-gray-100" />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full pb-0 animate-pulse flex flex-col gap-y-4">
      <div className="flex gap-20 lg:px-10 px-5">
        <div className="flex flex-col gap-y-3 w-full lg:w-[20%] items-center lg:items-start">
          <div className="w-[80%] h-9 rounded-lg bg-gray-100" />
          <div className="flex flex-col gap-y-1 my-2 w-full lg:w-auto items-center lg:items-start">
            <div className="w-full h-4 rounded-md bg-gray-100" />
            <div className="w-[90%] h-4 rounded-md bg-gray-100" />
          </div>
          <div className="w-[60%] h-12 rounded-xl bg-gray-200" />
          <div className="flex justify-between my-4 w-full">
            <div className="w-9 h-9 rounded-full bg-gray-50" />
            <div className="w-9 h-9 rounded-full bg-gray-50" />
            <div className="w-9 h-9 rounded-full bg-gray-50" />
            <div className="w-9 h-9 rounded-full bg-gray-50" />
          </div>
        </div>
        <div className="hidden lg:flex-1 lg:flex justify-between">
          {map([2, 5, 5, 4, 2], (length, key) => (
            <ItemComponent key={key} itemLength={length} />
          ))}
        </div>
      </div>
      <div className="w-full lg:h-14 rounded-md bg-gray-50 flex flex-col lg:flex-row justify-between items-center lg:px-10 px-5 py-5 lg:py-0 gap-y-5 lg:gap-y-0">
        <div className="flex justify-center gap-x-4 lg:gap-x-10 w-full lg:w-[20%]">
          <div className="w-[20%] lg:w-full h-4 rounded-md bg-gray-200" />
          <div className="w-[20%] lg:w-full h-4 rounded-md bg-gray-200" />
        </div>
        <div className="flex justify-center gap-x-10 w-full lg:w-[20%]">
          <div className="w-full h-4 rounded-md bg-gray-200" />
          <div className="w-full h-4 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default FooterSkeleton;
