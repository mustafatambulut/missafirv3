"use client";
import { get, map, take } from "lodash";
import { ReactNode, useState } from "react";

import { IAmenitiesSection } from "@/components/molecules/amenitiesSection/types";

import RightIcon from "../../../../public/images/variants/chevron_right.svg";
import MissafirLogo from "../../../../public/images/variants/missafir_logo.svg";

import Modal from "@/components/atoms/modal/Modal";
import Button from "@/components/atoms/button/Button";

const AmenitiesSection = ({ item, className = "" }: IAmenitiesSection) => {
  const [isOpen, setIsOpen] = useState(false);

  const TouchesComponent = (): ReactNode => (
    <article className="flex flex-col gap-y-6">
      <h5 className="flex items-start text-xl gap-x-2">
        <MissafirLogo /> Touches
      </h5>
      <div className="flex flex-wrap">
        {map(get(item, "missafir_touches"), (touch, key) => (
          <div
            key={key}
            className="flex flex-col items-center capitalize justify-center rounded-xl h-24 m-2 py-4 px-6 bg-primary-50 text-primary w-fit">
            {touch}
          </div>
        ))}
      </div>
    </article>
  );

  return (
    <section className={`flex flex-col gap-y-9 ${className}`}>
      <h1 className="text-2xl">Amenities</h1>
      <TouchesComponent />
      <article className="flex flex-col gap-y-6 items-start">
        <h1 className="text-2xl">What This Place Offers</h1>
        <div className="flex flex-wrap gap-2">
          {map(take(get(item, "amenities"), 5), ({ name }, key) => (
            <div
              key={key}
              className="flex flex-col items-center capitalize justify-center rounded-xl h-14 py-2 px-4 bg-gray-50 text-gray-600 w-fit">
              {name}
            </div>
          ))}
        </div>
        <Button
          variant="btn-ghost"
          onClick={() => setIsOpen(true)}
          className="text-primary text-lg px-0"
          outline={true}>
          See All Amenities
          <RightIcon />
        </Button>
        <Modal
          label="Amenities"
          headerClass="text-2xl"
          isOpen={isOpen}
          setIsOpen={setIsOpen}>
          <div className="py-2 mt-4 flex flex-col gap-y-6">
            <TouchesComponent />
            <div className="flex flex-col gap-y-6">
              <h1 className="text-xl">What This Place Offers</h1>
              <div className="flex flex-wrap gap-2">
                {map(get(item, "amenities"), ({ name }, key) => (
                  <div
                    key={key}
                    className="flex flex-col items-center capitalize justify-center rounded-xl h-14 py-2 px-4 bg-gray-50 text-gray-600 w-fit">
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      </article>
    </section>
  );
};

export default AmenitiesSection;
