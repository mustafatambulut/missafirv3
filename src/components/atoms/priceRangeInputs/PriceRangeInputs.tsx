import { get } from "lodash";
import { NumericFormat } from "react-number-format";

import {
  IChange,
  IPriceRangeInputs
} from "@/components/atoms/priceRangeInputs/types";
import { useTranslations } from "next-intl";
import Typography from "../typography/Typography";

const PriceRangeInputs = ({
  minPrice,
  maxPrice,
  handleInput
}: IPriceRangeInputs) => {
  const t = useTranslations();

  const handleValueChange = (type: string, values: IChange) => {
    const value = get(values, "floatValue");
    if (type === "min") {
      handleInput({
        minValue: value,
        maxValue: maxPrice
      });
    } else {
      handleInput({
        minValue: minPrice,
        maxValue: value
      });
    }
  };

  return (
    <div className="flex gap-3 mt-5 items-center">
      <div className="relative">
        <NumericFormat
          suffix="₺"
          value={minPrice}
          decimalSeparator=","
          thousandSeparator="."
          className="input input-bordered w-full max-w-xs pt-5"
          onValueChange={(values) => handleValueChange("min", values)}
          isAllowed={(values) => {
            const { floatValue } = values;
            return floatValue >= 0;
          }}
        />
        <Typography
          variant="p5"
          element="span"
          className="absolute left-4 text-gray-500 cursor-default"
        >
          {t("min_price")}
        </Typography>
        {/* <span className="absolute left-4 text-gray-500 text-sm cursor-default">
          {t("min_price")}
        </span> */}
      </div>
      <span>-</span>
      <div className="relative">
        <NumericFormat
          suffix="₺"
          value={maxPrice}
          decimalSeparator=","
          thousandSeparator="."
          className="input input-bordered w-full max-w-xs pt-5"
          onValueChange={(values) => handleValueChange("max", values)}
          isAllowed={(values) => {
            const { floatValue } = values;
            return floatValue <= maxPrice;
          }}
        />
        <Typography
          variant="p5"
          element="span"
          className="absolute left-4 text-gray-500 cursor-default"
        >
          {t("max_price")}
        </Typography>
      </div>
    </div>
  );
};

export default PriceRangeInputs;
