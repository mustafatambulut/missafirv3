import Image from "next/image";
import { get, map } from "lodash";

import { IAllDetail } from "@/components/molecules/allDetail/types";

import Key from "../../../../public/images/key.svg";
import Clock from "../../../../public/images/clock.svg";
import BrokenLink from "../../../../public/images/broken_link.svg";

const AllDetail = ({ detail, className = "" }: IAllDetail) => {
  return (
    <section className={`${className}`}>
      <article>
        <header>
          <h1 className="mb-6 text-2xl font-semibold text-gray-800">
            All Details
          </h1>
        </header>
        <div className="gap-y-6 text-lg">
          <div className="flex flex-row gap-x-60 xl:gap-x-80">
            <div className="flex flex-col gap-y-8 text-gray-500 font-normal font-mi-sans">
              <h1 className="text-xl -mb-3 text-gray-800">Key Info</h1>
              <div className="flex gap-x-3">
                <Clock />
                <div className="flex gap-x-6 -mt-1">
                  <div className="flex flex-col gap-y-1">
                    <span>Check-in from</span>
                    <span>{get(detail, "check_in_time")}</span>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <span>Check-out by</span>
                    <span>{get(detail, "check_out_time")}</span>
                  </div>
                </div>
              </div>
              {get(detail, "self_check_in") && (
                <div className="flex gap-x-3">
                  <Key />
                  <p>{get(detail, "self_check_in")}</p>
                </div>
              )}
              {get(detail, "cancelation_policy") && (
                <div className="flex gap-x-3">
                  <BrokenLink />
                  <p>{get(detail, "cancelation_policy")}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-6">
              <h1 className="text-xl">House Rules</h1>
              {map(get(detail, "house_rules"), ({ title, status }, key) => (
                <div className="flex items-start gap-x-3" key={key}>
                  <Image
                    src={status ? "/images/approval.svg" : "/images/delete.svg"}
                    width="22"
                    height="22"
                    alt="icon"
                  />
                  <p className="text-lg text-gray-500 font-normal font-mi-sans">
                    {title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default AllDetail;
