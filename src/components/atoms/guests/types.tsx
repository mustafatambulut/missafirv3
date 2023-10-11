export interface IGuests {
  isLabel?: boolean;
  className?: string;
  listClassName?: string;
  showIcon?: boolean;
  isInCustomSection?: boolean;
}

export interface IBookingGuestsData {
  adults: number;
  kids: number;
  pets: boolean;
}
