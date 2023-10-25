import Image from "next/image";
import { get, map } from "lodash";

import { ICardComponent } from "@/components/molecules/testimonial/types";

import Card from "@/components/atoms/card/Card";
import Loading from "@/components/atoms/loading/Loading";
import Typography from "@/components/atoms/typography/Typography";
import Slider from "@/components/molecules/slider/Slider";
import Section from "@/components/molecules/section/Section";
import TestimonialSkeleton from "@/components/molecules/skeletons/testimonialSkeleton/TestimonialSkeleton";

import "swiper/css";
import "swiper/css/free-mode";

const Testimonial = ({ testimonials }: any) => {
  const CardComponent = ({ item }: ICardComponent) => (
    <Card className="bg-primary-25 rounded-2xl p-3 lg:p-5">
      <div className="w-[60px] h-[60px] lg:w-[120px] lg:h-[120px] relative">
        {get(item, "header_image") && (
          <Image
            fill
            priority
            className="mb-2"
            alt="testimonials"
            src={get(item, "header_image")}
          />
        )}
      </div>
      <div className="line-clamp-5 h-28">
        <Typography element="p" variant="p3">
          {get(item, "info")}
        </Typography>
      </div>
      <div className="line-clamp-1">
        <Typography element="h6" variant="h6">
          {get(item, "footer_desc")}
        </Typography>
      </div>
    </Card>
  );

  return (
    <Loading isLoading={!testimonials} loader={<TestimonialSkeleton />}>
      <Section
        className="px-4 lg:px-20 mt-14"
        title={get(testimonials, "header.title")}
        description={get(testimonials, "header.description")}>
        <Slider
          desktopSlidesPerView={3}
          mobileSlidesPerView={1}
          desktopSpaceBetween={15}
          desktopLargeSlidesPerView={3}
          desktopLargeSpaceBetween={20}
          mobileSpaceBetween={15}
          sliderIdentifier={"testimonials"}
          sliderWrapperClassName="pr-20 lg:pr-0">
          {map(get(testimonials, "body"), (item, key) => (
            <CardComponent key={key} item={item} />
          ))}
        </Slider>
      </Section>
    </Loading>
  );
};

export default Testimonial;
