'use client'
import { IOurPackages } from "@/app/pages/static/our-packages/types";
import Typography from "@/components/atoms/typography/Typography";
import MyCheck from '/public/images/approval.svg'
import Button from "@/components/atoms/button/Button";
import { useTranslations } from "next-intl";
import { split } from "lodash";
const OurPackages = ({ className = "" }: IOurPackages) => {
  const t = useTranslations()
  return (
      <div className={`${className}`}>
        <div className="container mx-auto my-36 pb-14">
          <Typography element="h1" variant="h3" className="text-center">
            {t("our_packages")?.split(" ")[0]} <span className="text-primary">{t("our_packages")?.split(" ")[1]}</span>
          </Typography>
          <Typography variant="p3" element="p" className="text-center text-gray-600 lg:mt-4 mt-2">
            {t("choose_the_package_that_meets_your_needs")}
          </Typography>
          <div className="flex flex-col lg:flex-row justify-center mx-4 lg:mx-0">
            <div className="lg:w-[440px] w-full h-auto order-last lg:order-first lg:h-[600px] lg:mt-20 mt-10 border-2 border-gray-100 rounded-xl py-8 px-6">
              <div className="bg-primary-50 py-2 px-4 w-48 rounded-lg text-primary font-bold">
                {t("15_per_booking")}
              </div>
              <Typography variant="h5" element="h3" className="mt-6">
                {t("profile_management")}
              </Typography>
              <Typography variant="p4" element="p" className="text-gray-600 mt-6">
                {t("best_for_single_or_multiple_property_owners")}
              </Typography>
              <hr className="my-6" />
              {/* First */}
              <div className="flex gap-x-2 mt-3">
                <MyCheck />
                <Typography
                    variant="p4"
                    element="span"
                    className="text-gray-700 font-bold"
                >
                  {t("first_packages_one")}
                </Typography>
              </div>
              {/* Second */}
              <div className="flex gap-x-2 mt-4">
                <MyCheck />
                <Typography
                    variant="p4"
                    element="span"
                    className="text-gray-700 font-bold"
                >
                  {t("first_packages_two")}
                </Typography>
              </div>
              {/* Third */}
              <div className="flex gap-x-2 mt-4">
                <MyCheck />
                <Typography
                    variant="p4"
                    element="span"
                    className="text-gray-700 font-bold"
                >
                  {t("first_packages_three")}
                </Typography>
              </div>
              {/* Fourth */}
              <div className="flex gap-x-2 mt-4">
                <MyCheck />
                <Typography
                    variant="p4"
                    element="span"
                    className="text-gray-700 font-bold"
                >
                  {t("first_packages_four")}
                </Typography>
              </div>
              {/* Five */}
              <div className="flex gap-x-2 mt-4">
                <MyCheck />
                <Typography
                    variant="p4"
                    element="span"
                    className="text-gray-700 font-bold"
                >
                  {t("first_packages_five")}
                </Typography>
              </div>
              {/* Six */}
              <div className="flex gap-x-2 mt-4">
                <MyCheck />
                <Typography
                    variant="p4"
                    element="span"
                    className="text-gray-700 font-bold"
                >
                  {t("first_packages_six")}
                </Typography>
              </div>
              <Button
                  className="w-full mt-8"
              >
                {t("let's_start")}
              </Button>
            </div> {/* First one is finish */}
            <div className="lg:w-[440px] w-full lg:mt-20 mt-10  lg:ml-4 ml-0 border-2 border-primary rounded-xl py-8 px-6 relative">
              <div className="absolute flex justify-center items-center lg:ml-24 ml-14 -mt-12 r-24 rounded-xl w-48 bg-gradient-to-r from-primary to-pink text-white py-2">
                {t("the_most_preferred")}
              </div>
              <div className="bg-primary-100 py-2 mt-4 px-4 w-48 rounded-lg text-primary font-bold">
                {t("30_per_booking")}
              </div>
              <Typography variant="h5" element="h3" className="mt-6">
                {t("full_management")}
              </Typography>
              <Typography variant="p4" element="p" className="text-gray-600 mt-6">
                {t("best_for_overseas_property_owners_or_those_looking_for_extensive_professional_support")}
              </Typography>
              <hr className="my-6" />
              {/* First */}
              <div className="flex gap-x-2 mt-3">
                <MyCheck />
                <Typography
                    variant="p4"
                    element="span"
                    className="text-gray-700 font-bold"
                >
                  {t("second_packages_one")}
                </Typography>
              </div>
              {/* Second */}
              <div className="flex gap-x-2 mt-4">
                <MyCheck />
                <Typography
                    variant="p4"
                    element="span"
                    className="text-gray-700 font-bold"
                >
                  {t("second_packages_two")}
                </Typography>
              </div>
              {/* Third */}
              <div className="flex gap-x-2 mt-4">
                <MyCheck />
                <Typography
                    variant="p4"
                    element="span"
                    className="text-gray-700 font-bold"
                >
                  {t("second_packages_three")}
                </Typography>
              </div>
              {/* Fourth */}
              <div className="flex gap-x-2 mt-4">
                <MyCheck />
                <Typography
                    variant="p4"
                    element="span"
                    className="text-gray-700 font-bold"
                >
                  {t("second_packages_four")}
                </Typography>
              </div>
              {/* Five */}
              <div className="flex gap-x-2 mt-4">
                <MyCheck />
                <Typography
                    variant="p4"
                    element="span"
                    className="text-gray-700 font-bold"
                >
                  {t("second_packages_five")}
                </Typography>
              </div>
              {/* Six */}
              <div className="flex gap-x-2 mt-4">
                <MyCheck />
                <Typography
                    variant="p4"
                    element="span"
                    className="text-gray-700 font-bold"
                >
                  {t("second_packages_six")}
                </Typography>
              </div>
              {/* Seven */}
              <div className="flex gap-x-2 mt-4">
                <MyCheck />
                <Typography
                    variant="p4"
                    element="span"
                    className="text-gray-700 font-bold"
                >
                  {t("second_packages_seven")}
                </Typography>
              </div>
              <Button
                  className="w-full mt-8"
              >
                {t("let's_start")}
              </Button>
            </div> {/* First one is finish */}
          </div>
          {/* Flex div end here */}
        </div>
      </div>
  );
};
export default OurPackages;
