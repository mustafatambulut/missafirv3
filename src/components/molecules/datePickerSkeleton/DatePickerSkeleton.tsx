import map from "lodash/map";
import range from "lodash/range";

const DatePickerSkeleton = () => {
  return (
    <div className="border border-gray-100 flex flex-col absolute right-0.5 mt-4 w-[770px] h-[460px] rounded-lg px-5 pb-10 bg-white z-50">
      <div className="flex gap-x-5 animate-pulse justify-between">
        {map(range(2), (item, key) => (
          <div key={key} className="flex pt-7 flex-col gap-y-4">
            <div className="flex justify-center pb-2">
              <div className="w-1/2 h-3 rounded bg-gray-200" />
            </div>
            {map(range(6), (item, key) => (
              <div
                key={key}
                className="h-6 flex justify-between items-center my-1 gap-x-3">
                {map(range(7), (item, key) => (
                  <div
                    key={key}
                    className="w-10 h-10 rounded-full bg-gray-200"
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="animate-pulse w-full mt-10 flex justify-end px-6">
        <div className="w-[10%] h-6 rounded bg-gray-300" />
      </div>
    </div>
  );
};

export default DatePickerSkeleton;
