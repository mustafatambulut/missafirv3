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
  skipButtonVisibility: boolean;
  setBookingDate: IBookingDate;
  setBookingGuests: IBookingGuest;
  handleOpenDrawer: void;
  handleFilterListings: void;
  setActiveSearchItem?: string;
  setSkipButtonVisibility: boolean;
}
