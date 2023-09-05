import { map, size } from "lodash";
import { isMobile } from "react-device-detect";

import { ITouchesSection } from "@/components/molecules/touchesSection/types";

import MiLogo from "../../../../public/images/variants/missafir_logo.svg";
import MiSmallLogo from "../../../../public/images/variants/missafir_logo_small.svg";

const TouchesSection = ({ touches, className = "" }: ITouchesSection) => {
  if (!size(touches)) return;

  return (
    <article className={`flex flex-col gap-y-6 ${className}`}>
      <h5 className="flex items-center lg:items-start lg:text-xl gap-x-2">
        <span>{isMobile ? <MiSmallLogo /> : <MiLogo />}</span>
        <span className="mt-1 lg:mt-0">Touches</span>
      </h5>
      <div className="flex flex-wrap">
        {map(touches, (touch, key) => (
          <div
            key={key}
            className="flex flex-col items-center capitalize justify-center rounded-xl h-24 m-2 py-4 px-6 bg-primary-50 text-primary w-fit">
            {touch}
          </div>
        ))}
      </div>
    </article>
  );
};

export default TouchesSection;
