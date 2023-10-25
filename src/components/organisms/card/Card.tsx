import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { isArray, map } from "lodash";

import { ICard } from "@/components/organisms/card/types";

import Slider from "@/components/molecules/slider/Slider";

//import HeartIcon from "../../../../public/images/variants/heart.svg";

const Card = ({
  setIsFav,
  children,
  title = "",
  className = "",
  bodyClass = "",
  titleClass = "",
  showBadge = false,
  badgeTitle = "",
  badgeClass = "",
  images = null,
  sliderOptions = {
    mobileSlidesPerView: 1,
    desktopSlidesPerView: 4,
    mobileSpaceBetween: 5,
    desktopSpaceBetween: 10,
    desktopLargeSlidesPerView:5,
    desktopLargeSpaceBetween:10,
    withPagination: false,
    sliderIdentifier: "",
    customPagination: null,
    sliderWrapperClassName: "",
    sliderContainerClassName: ""
  }
}: ICard) => {
  const [isFavored, setIsFavored] = useState<boolean>(false);

  // const favClass = classNames("stroke-white w-10 h-10 cursor-pointer", {
  //   "fill-primary": isFavored
  // });

  //todo: favoriye ekleme işlemi düzenlenecek (slider baştan alıyor)

  // const handleFavButton = (e) => {
  //   e.preventDefault();
  //   setIsFavored(!isFavored);
  // };

  useEffect(() => {
    if (typeof setIsFav === "function") setIsFav(isFavored);
  }, [isFavored]);

  const ImageComponent = (): ReactNode => {
    return isArray(images) ? (
      <Slider {...sliderOptions}>
        {map(images, (image, key) => (
          <section key={key} className="h-96 relative">
            {image && (
              <Image
                fill
                src={image}
                alt="detail"
                sizes="(max-width: 768px) 50vw 50vh"
                className="object-cover"
              />
            )}
          </section>
        ))}
      </Slider>
    ) : (
      <>
        {images && (
          <Image
            width={1000}
            height={1000}
            alt="slide-img"
            src={images}
            className="rounded-t-xl"
          />
        )}
      </>
    );
  };

  return (
    <div className={`card w-full bg-white ${className}`}>
      {images && (
        <div className="static">
          <ImageComponent />
          {showBadge && (
            <div
              className={`absolute z-30 left-0 top-0 p-3 m-3 rounded-lg text-black ${badgeClass}`}>
              {badgeTitle}
            </div>
          )}
          {/*todo: favoriye ekleme bağlanınca açılacak*/}
          {/*{!!setIsFav && (*/}
          {/*  <div*/}
          {/*    onClick={handleFavButton}*/}
          {/*    className="absolute z-30 top-0 right-0 m-3">*/}
          {/*    <HeartIcon className={favClass} />*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      )}
      <h2 className={`card-title my-2 ${titleClass}`}>{title}</h2>
      <div className={`card-body ${bodyClass}`}>{children}</div>
    </div>
  );
};

export default React.memo(Card);
