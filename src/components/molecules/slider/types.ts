import React from "react";

export interface ISlider {
  slides: ISlide[];
  spaceBetween?: number;
  slidesPerView?: number;
  withPagination?: boolean;
  withNavigation?: boolean;
  customNavigation?: null | React.ReactNode;
  customSlide?: null | React.ReactNode;
}

export interface ISlide {
  description?: string;
  image: string;
}
