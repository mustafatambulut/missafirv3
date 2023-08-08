import {
  IBookingDate,
  IBookingGuest
} from "@/components/atoms/datePicker/types";

export interface IProps {
  drawerCloseRef?: HTMLInputElement;
  bookingDate?: IBookingDate;
  isDrawerOpen: boolean;
  bookingGuests: IBookingGuest;
  activeSearchItem?: string;
  bookingDestination?: string;
  skipButtonVisibility: boolean;
  setBookingDate: IBookingDate;
  setBookingGuests: IBookingGuest;
  handleOpenDrawer: void;
  setActiveSearchItem?: string;
  setBookingDestination?: string;
  setSkipButtonVisibility: boolean;
}
