import Image from "next/image";
import { get, map, size } from "lodash";

import { IAllDetail } from "@/components/molecules/allDetail/types";

import Key from "../../../../public/images/key.svg";
import Clock from "../../../../public/images/clock.svg";
import { useTranslations } from "next-intl";
import Typography from "@/components/atoms/typography/Typography";
import CancellationPolicy from "@/components/molecules/cancellationPolicy/CancellationPolicy";

const AllDetail = ({ detail, className = "" }: IAllDetail) => {
  const t = useTranslations();
  return (
    <section className={`${className}`}>
      <article>
        <header>
          <Typography variant="h5" element="h3" className="mb-6 text-gray-800">
            {t("all_details")}
          </Typography>
        </header>
        <div className="gap-y-6 text-lg">
          <div className="flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row gap-x-60 xl:gap-x-80">
            <div className="flex flex-col gap-y-8 text-gray-500 font-normal font-mi-sans">
              <Typography
                variant="h6"
                element="h6"
                className="-mb-3 text-gray-800">
                {t("key_info")}
              </Typography>
              <div className="flex gap-x-3">
                <Clock />
                <div className="flex gap-x-6 -mt-1">
                  <div className="flex flex-col gap-y-1">
                    <Typography
                      variant="p3"
                      element="span"
                      className="font-black text-gray-600">
                      {t("check_in_from")}
                    </Typography>
                    <Typography variant="p3" element="span">
                      {get(detail, "check_in_time")}
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <Typography
                      variant="p3"
                      element="span"
                      className="font-black text-gray-600">
                      {t("check_out_by")}
                    </Typography>
                    <Typography variant="p3" element="span">
                      {get(detail, "check_out_time")}
                    </Typography>
                  </div>
                </div>
              </div>
              {get(detail, "self_check_in") && (
                <div className="flex gap-x-3">
                  <Key />
                  <Typography variant="p3" element="p">
                    {get(detail, "self_check_in")}
                  </Typography>
                </div>
              )}
              {get(detail, "cancelation_policy") && (
                <CancellationPolicy
                  policy={get(detail, "cancelation_policy")}
                />
              )}
            </div>
            {size(get(detail, "house_rules")) > 0 ? (
              <div className="flex flex-col gap-y-6">
                <Typography
                  variant="h6"
                  element="h6"
                  className="text-base lg:text-xl">
                  {t("house_rules")}
                </Typography>
                {map(get(detail, "house_rules"), ({ title, status }, key) => (
                  <div className="flex items-start gap-x-3" key={key}>
                    <Image
                      src={
                        status ? "/images/approval.svg" : "/images/delete.svg"
                      }
                      width="22"
                      height="22"
                      alt="icon"
                    />
                    <Typography
                      variant="p3"
                      element="p"
                      className="text-gray-500 font-normal font-mi-sans">
                      {title}
                    </Typography>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </section>
  );
};

export default AllDetail;
