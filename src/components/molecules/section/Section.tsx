import React from "react";

import { ISection } from "@/components/molecules/section/types";
import Typography from "@/components/atoms/typography/Typography";

const Section = ({ title, description, className, children }: ISection) => {
  return (
    <section className={className}>
      <div className="mb-5 lg:mb-10 text-center text-gray-900 flex flex-col items-center">
        <Typography element="h3" variant="h3" className="mb-2 lg:mb-5 text-gray-800">
          {title}
        </Typography>
        <Typography
          element="p"
          variant="p3"
          className="text-center lg:max-w-2xl text-gray-600">
          {description}
        </Typography>
      </div>
      {children}
    </section>
  );
};

export default Section;
