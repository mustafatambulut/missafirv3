import Image from "next/image";
import { get, map } from "lodash";

import Typography from "../typography/Typography";
import Card from "@/components/atoms/card/Card";
import Loading from "@/components/atoms/loading/Loading";
import Section from "@/components/molecules/section/Section";
import BenefitSkeleton from "@/components/molecules/skeletons/benefitSkeleton/BenefitSkeleton";

const BenefitOwner = ({ benefit }: any) => {
  return (
    <Loading isLoading={!benefit} loader={<BenefitSkeleton />}>
      <Section
        className="px-2 lg:px-8 mt-14"
        title={get(benefit, "header.title")}
        description={get(benefit, "header.description")}>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-8 lg:my-20">
          {map(get(benefit, "body"), (benefit, key) => (
            <Card key={key} className="mb-12 lg:mb-0">
              <div className="flex flex-col items-center">
                {get(benefit, "image") && (
                  <Image
                    alt="image"
                    width={64}
                    height={64}
                    className="mb-7 w-16 h-16"
                    src={get(benefit, "image")}
                  />
                )}
                <div className="lg:h-20">
                  <Typography
                    variant="p1"
                    element="h3"
                    className="text-center mb-3 text-28 font-mi-sans-semi-bold text-gray-800">
                    {get(benefit, "title")}
                  </Typography>
                </div>
                <Typography
                  variant="p3"
                  element="div"
                  className="text-center text-gray-600 tex-2xl line-clamp-3">
                  {get(benefit, "description")}
                </Typography>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </Loading>
  );
};

export default BenefitOwner;
