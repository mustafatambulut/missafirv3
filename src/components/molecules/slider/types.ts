import React from "react";

export interface ISlider {
  spaceBetween?: number;
  slidesPerView?: number;
  sliderIdentifier: string;
  withPagination?: boolean;
  withNavigation?: boolean;
  children: React.ReactNode[];
  sliderWrapperClassName?: string;
  sliderContainerClassName?: string;
  customSlide?: null | React.ReactNode;
  customNavigation?: null | React.ReactNode;
  customPagination?: null | React.ReactNode;
}

export interface ISlide {
  image: string;
  description?: string;
}
