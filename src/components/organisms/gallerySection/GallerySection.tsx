"use client";
import { map } from "lodash";
import Image from "next/image";
import { isMobile } from "react-device-detect";

import { IGallerySection } from "@/components/organisms/gallerySection/types";

import Button from "@/components/atoms/button/Button";
import Slider from "@/components/molecules/slider/Slider";
import ImageCarousel from "@/components/molecules/imageCarousel/ImageCarousel";

import FavoriteIcon from "../../../../public/images/favorite.svg";

const GallerySection = ({ images, className = "" }: IGallerySection) => {
  return (
    <div className={`${className}`}>
      {isMobile ? (
        <Slider
          withPagination={true}
          sliderContainerClassName="lg:hidden"
          sliderIdentifier="gallery-slider"
          slidesPerView={isMobile ? 1 : 2}
          spaceBetween={isMobile ? 12 : 20}>
          {map(images, ({ path, caption }, key) => (
            <div key={key} className="static h-60 lg:h-auto">
              <span className="absolute top-3 right-3">
                <Button
                  onClick={() => alert("favorite")}
                  variant="btn-ghost"
                  className="hover:bg-transparent focus:outline-0 border-none h-2 px-1">
                  <FavoriteIcon className="fill-transparent stroke-white" />
                </Button>
              </span>
              <Image
                priority
                src={path || "/"}
                fill={true}
                alt={caption || "/"}
                className="object-cover"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <ImageCarousel width={600} height={600} images={images || "/"} />
      )}
    </div>
  );
};

export default GallerySection;
