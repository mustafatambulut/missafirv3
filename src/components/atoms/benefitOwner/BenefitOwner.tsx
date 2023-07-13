"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { filter, first, get, map } from "lodash";

import { BODY, HOME } from "@/app/constants";
import { getPageDataByComponent } from "@/utils/helper";

import Card from "@/components/atoms/card/Card";
import Section from "@/components/molecules/section/Section";

const BenefitOwner = () => {
  const [benefit, setBenefit] = useState(null);

  const fetchData = async () => {
    const response = await getPageDataByComponent(HOME, BODY);
    const benefitData = first(
      filter(
        response,
        (item) => item["__component"] === "sections.benefit-owner"
      )
    );
    setBenefit(benefitData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {benefit && (
        <Section
          className="px-4 lg:px-8 mt-14"
          title={get(benefit, "header.title")}
          description={get(benefit, "header.description")}>
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {map(get(benefit, "body"), (benefit, key) => (
              <Card key={key}>
                <div className="flex flex-col items-center">
                  <Image
                    className="mb-7"
                    src={get(benefit, "image") || ""}
                    alt="image"
                    width={64}
                    height={64}
                  />
                  <h3 className="text-center mb-3 text-28 font-mi-sans-semi-bold text-gray-800">
                    {get(benefit, "title")}
                  </h3>
                  <div className="text-center text-gray-600 tex-2xl">
                    {get(benefit, "description")}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}
    </>
  );
};

export default BenefitOwner;
