import { IBookingDate } from "@/components/atoms/datePicker/types";

export interface IListingDetailState {
  booking: {
    startDate: string;
    endDate: string;
  };
  notAvailableModal?: boolean;
  resPayload: ResPayload;
  guestOptions: GuestOption[];
  isBookingInfoEditing: boolean;
  bookingDate: IBookingDate;
  links: [];
}

export interface ResPayload {
  slug?: string;
  check_in?: string;
  check_out?: string;
  adults?: number;
  kids?: number;
  pets?: number;
}

export interface GuestOption {
  name: string;
  value: number;
}
