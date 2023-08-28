import { Dispatch, ReactNode, SetStateAction } from "react";
import { ISlider } from "@/components/molecules/slider/types";

export interface ICard {
  setIsFav?: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  className?: string;
  bodyClass?: string;
  titleClass?: string;
  showFav?: boolean;
  showBadge?: boolean;
  badgeClass?: string;
  badgeTitle?: string;
  images?: string | [];

  sliderOptions: ISlider;
}
