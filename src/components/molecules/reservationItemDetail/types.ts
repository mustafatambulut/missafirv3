import { IReservationItemProps } from "@/components/molecules/reservationItem/types";
import { MutableRefObject } from "react";

export interface IReservationItemDetail {
  left: number;
  itemRef: MutableRefObject<null>;
  actionRef: MutableRefObject<null>;
  handleStop: () => void;
  // eslint-disable-next-line no-unused-vars
  handleDrag: (e: any, data: any) => void;
  reservation: IReservationItemProps;
  isInWishlist: boolean;
  isMobileDevice: boolean;
  // eslint-disable-next-line no-unused-vars
  handleClickWishlist: (e: any) => void;
}
