import { map } from "lodash";

import { IArrangementSection } from "@/components/molecules/arrangementSection/types";

import DoubleBedIcon from "../../../../public/images/double_bed.svg";

const ArrangementSection = ({ items, className = "" }: IArrangementSection) => {
  return (
    <section className={`${className}`}>
      <article className="flex flex-col gap-y-6 lg:gap-y-9">
        <h1 className="text-lg lg:text-2xl text-gray-800">
          Sleeping Arrangements
        </h1>
        <div className="flex gap-x-4">
          {map(items, ({ name, count }) => (
            <div className="flex flex-col items-center capitalize justify-center rounded-xl h-24 py-4 px-6 bg-gray-50 text-gray-600 w-fit">
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
