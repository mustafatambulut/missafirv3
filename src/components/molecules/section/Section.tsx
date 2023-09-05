import React from "react";

import { ISection } from "@/components/molecules/section/types";

const Section = ({ title, description, className, children }: ISection) => {
  return (
    <section className={className}>
      <div className="mb-10 text-center text-gray-900 flex flex-col items-center">
        <h2 className="text-28 lg:text-42 mb-5">{title}</h2>
        <p className="text-lg lg:text-2xl lg:max-w-2xl text-center">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
};

export default Section;
