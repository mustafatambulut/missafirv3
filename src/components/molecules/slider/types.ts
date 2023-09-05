import { ReactNode } from "react";

export interface ISlider {
  initialSlide?: number;
  spaceBetween?: number;
  slidesPerView?: number | string;
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
