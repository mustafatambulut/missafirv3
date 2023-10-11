import { map } from "lodash";

import { IArrangementSection } from "@/components/molecules/arrangementSection/types";

import DoubleBedIcon from "../../../../public/images/double_bed.svg";
import { useTranslations } from "next-intl";
import Typography from "@/components/atoms/typography/Typography";

const ArrangementSection = ({ items, className = "" }: IArrangementSection) => {
  const t = useTranslations()
  return (
    <section className={`${className}`}>
      <article className="flex flex-col gap-y-6 lg:gap-y-9">
        <Typography variant="h5" element="h5" className="text-gray-800">
          {t("sleeping_arrangements")}
        </Typography>
        <div className="flex gap-4 flex-wrap">
          {map(items, ({ name, count }, key) => (
            <div
              key={key}
              className="flex flex-col items-center capitalize justify-center rounded-xl h-24 py-4 px-6 bg-gray-50 text-gray-600 w-fit">
              <DoubleBedIcon />
              {`${count} ${name}`}
            </div>
          ))}
        </div>
        <hr className="lg:hidden" />
      </article>
    </section>
  );
};

export default ArrangementSection;
