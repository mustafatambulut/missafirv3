import { ReactNode } from "react";

export interface ISlider {
  spaceBetween?: number;
  slidesPerView?: number;
  sliderIdentifier: string;
  withPagination?: boolean;
  withNavigation?: boolean;
  children: ReactNode[] | ReactNode;
  sliderWrapperClassName?: string;
  sliderContainerClassName?: string;
  customSlide?: null | ReactNode;
  customNavigation?: null | ReactNode;
  customPagination?: null | ICustomPagination;
}
export interface ICustomPagination {
  clickable?: boolean;
  renderBullet?: ReactNode;
}
export interface ISlide {
  image: string;
  description?: string;
}
