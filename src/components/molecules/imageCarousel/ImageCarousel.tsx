"use client";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { clone, find, map, remove, size, take } from "lodash";

import {
  Images,
  IImageCarousel,
  IPhotosComponent
} from "@/components/molecules/imageCarousel/types";
import { getLocation } from "@/utils/helper";

import Modal from "@/components/atoms/modal/Modal";
import Button from "@/components/atoms/button/Button";
import Slider from "@/components/molecules/slider/Slider";

import PadIcon from "../../../../public/images/pad.svg";
import ShareIcon from "../../../../public/images/share.svg";
import FavoriteIcon from "../../../../public/images/favorite.svg";
import LeftIcon from "../../../../public/images/variants/left_arrow.svg";

const ImageCarousel = ({
  images,
  width = 200,
  height = 200,
  className = "",
  imageClass = ""
}: IImageCarousel) => {
  const [swiper, setSwiper] = useState<any>(null);
  const [isOpenModal, setIsOpenModal] = useState<null | boolean>(null);
  const [sliderImages, setSliderImages] = useState<[]>([]);
  const [selectedImage, setSelectedImage] = useState<null | Images>(null);
  const [showCarouselModal, setShowCarouselModal] = useState<boolean>(false);

  const imageClassName = (key: number, isModal: boolean) => {
    return classNames(`w-full ${imageClass}`, {
      "col-span-2 row-span-2": key === 0,
      "cursor-pointer": isModal
    });
  };

  const handleImage = (e, isModal, path_extra) => {
    e.stopPropagation();
    setSelectedImage(path_extra);

    isModal && setShowCarouselModal(true);
  };

  const slideTo = (index) => swiper.slideTo(index);

  useEffect(() => {
    if (selectedImage) {
      const cloned = clone(images);
      remove(cloned, ({ path_extra }) => path_extra === selectedImage);

      const finded = find(images, ["path_extra", selectedImage]);
      finded && setSliderImages([finded, ...cloned]);
    }
  }, [selectedImage]);

  const PhotosComponent = ({
    images,
    isModal
  }: IPhotosComponent): ReactNode => {
    return (
      <div
        className={`grid grid-rows-3 lg:grid-rows-2 grid-cols-2 lg:grid-cols-4 gap-2 ${className}`}>
        {map(images, ({ path, path_extra, caption }, key) => (
          <Image
            onClick={(e) => handleImage(e, isModal, path_extra)}
            key={key}
            src={path}
            width={width}
            height={height}
            className={imageClassName(key, isModal)}
            alt={caption}
          />
        ))}
      </div>
    );
  };

  const handleClose = () => {
    slideTo(0);
    setShowCarouselModal(false);
  };

  return (
    <div className={className}>
      <div className="absolute right-10 top-28">
        <div className="flex justify-center">
          {/*todo: favori ekleme özelliği tamamlanacak*/}
          <Button
            onClick={() => alert("favorite")}
            variant="btn-ghost"
            className="hover:bg-transparent focus:outline-0 border-none h-2 px-1">
            <span className="flex justify-center items-center w-10 h-10 bg-white hover:bg-gray-100 rounded-full">
              <FavoriteIcon className="fill-transparent stroke-black" />
            </span>
          </Button>
          {/*todo: share butonu event'i eklenmesi gerek*/}
          <Button
            onClick={() => navigator.clipboard.writeText(getLocation("href"))}
            variant="btn-ghost"
            className="hover:bg-transparent focus:outline-0 border-none h-2 px-1">
            <span className="flex justify-center items-center w-10 h-10 bg-white hover:bg-gray-100 rounded-full">
              <ShareIcon />
            </span>
          </Button>
        </div>
      </div>
      <PhotosComponent isModal={false} images={take(images, 5)} />
      <Button
        onClick={() => setIsOpenModal(true)}
        variant="btn-white"
        className="absolute hover:bg-gray-100 focus:outline-0 border-none text-gray-600 h-2 right-10 bottom-56">
        <PadIcon />
        {`All ${size(images)} Photos`}
      </Button>
      <Modal
        label="All Photos"
        isOpen={isOpenModal}
        headerClass="text-2xl"
        bodyClass="lg:w-11/12 lg:max-w-5xl"
        setIsOpen={setIsOpenModal}>
        <PhotosComponent isModal={true} images={images} />
      </Modal>
      <Modal
        onClose={handleClose}
        closeCallBack={() => slideTo(0)}
        label={<LeftIcon className="cursor-pointer" onClick={handleClose} />}
        headerClass="text-2xl"
        bodyClass="max-w-full max-h-full"
        isOpen={showCarouselModal}
        setIsOpen={setShowCarouselModal}>
        <Slider
          onSwiper={setSwiper}
          spaceBetween={0}
          slidesPerView={1}
          withPagination={false}
          withNavigation={true}
          sliderIdentifier="carousel-image"
          sliderWrapperClassName="w-full h-screen mt-4">
          {map(sliderImages, ({ path_extra, caption }, key) => (
            <Image
              key={key}
              fill={true}
              alt={caption}
              src={path_extra}
              className="rounded-xl object-cover"
            />
          ))}
        </Slider>
      </Modal>
    </div>
  );
};

export default ImageCarousel;
