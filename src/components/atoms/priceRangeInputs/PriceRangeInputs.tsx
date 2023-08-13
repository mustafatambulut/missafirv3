import { get } from "lodash";
import { NumericFormat } from "react-number-format";

import {
  IChange,
  IPriceRangeInputs
} from "@/components/atoms/priceRangeInputs/types";

const PriceRangeInputs = ({
  handleInput,
  priceRangeData
}: IPriceRangeInputs) => {
  const handleValueChange = (type: string, values: IChange) => {
    const value = get(values, "floatValue");
    if (type === "min") {
      handleInput({
        minValue: value,
        maxValue: get(priceRangeData, "price.max")
      });
    } else {
      handleInput({
        minValue: get(priceRangeData, "price.min"),
        maxValue: value
      });
    }
  };

  return (
    <div className="flex gap-3 mt-5 items-center">
      <div className="relative">
        <NumericFormat
          className="input input-bordered w-full max-w-xs pt-5"
          value={get(priceRangeData, "price.min")}
          suffix="₺"
          thousandSeparator="."
          decimalSeparator=","
          onValueChange={(values) => handleValueChange("min", values)}
          isAllowed={(values) => {
            const { floatValue } = values;
            return floatValue >= 0;
          }}
        />
        <span className="absolute left-4 text-gray-500 text-sm cursor-default">
          min price
        </span>
      </div>
      <span>-</span>
      <div className="relative">
        <NumericFormat
          className="input input-bordered w-full max-w-xs pt-5"
          value={get(priceRangeData, "price.max")}
          suffix="₺"
          thousandSeparator="."
          decimalSeparator=","
          onValueChange={(values) => handleValueChange("max", values)}
          isAllowed={(values) => {
            const { floatValue } = values;
            return floatValue <= get(priceRangeData, "defaultPriceRange.max");
          }}
        />
        <span className="absolute left-4 text-gray-500 text-sm cursor-default">
          max price
        </span>
      </div>
    </div>
  );
};

export default PriceRangeInputs;
