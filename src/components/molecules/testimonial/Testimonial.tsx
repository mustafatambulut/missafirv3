"use client";
import Image from "next/image";
import { get, map } from "lodash";
import { isMobile } from "react-device-detect";

import {
  ITestimonial,
  ICardComponent
} from "@/components/molecules/testimonial/types";
import useFetchData from "@/app/hooks/useFetchData";
import { BODY } from "@/app/constants";
import { TESTIMONIAL_SECTION } from "@/components/molecules/testimonial/constants";

import Card from "@/components/atoms/card/Card";
import Loading from "@/components/atoms/loading/Loading";
import Slider from "@/components/molecules/slider/Slider";
import Section from "@/components/molecules/section/Section";

import "swiper/css";
import "swiper/css/free-mode";

const Testimonial = () => {
  const testimonials = useFetchData<ITestimonial>(BODY, TESTIMONIAL_SECTION);

  const CardComponent = ({ item }: ICardComponent) => (
    <Card className="bg-primary-25 rounded-2xl p-3 lg:p-5">
      <div className="w-[60px] h-[60px] lg:w-[120px] lg:h-[120px] relative">
        <Image
          fill
          className="mb-2"
          alt="testimonials"
          src={get(item, "header_image")}
        />
      </div>
      <div className="text-xl lg:text-2xl">{get(item, "info")}</div>
      <div className="text-base lg:text-2xl font-mi-sans-semi-bold">
        {get(item, "footer_desc")}
      </div>
    </Card>
  );

  return (
    <Loading isLoading={!testimonials} loader={<p>Loading feed...</p>}>
      {/*todo: skeleton eklenecek*/}
      <Section
        className="px-4 lg:px-20 mt-14"
        title={get(testimonials, "header.title")}
        description={get(testimonials, "header.description")}>
        <Slider
          slidesPerView={isMobile ? 1 : 3}
          spaceBetween={15}
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
