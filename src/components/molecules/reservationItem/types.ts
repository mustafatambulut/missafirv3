import { ReactNode } from "react";

export interface IReservationItem {
  reservation: IReservationItemProps;
}

export interface IReservationItemProps {
  title: string;
  code: string;
  location: string;
  dates: string;
  guests: string;
  price: Price;
  status: Status;
  badges: Badge[];
  images: Image[];
}

export interface Price {
  amount: string;
  type: string;
}

export interface Status {
  icon: ReactNode;
  type: string;
  color: string;
  label: string;
}

export interface Badge {
  color: string;
  label: string;
}

export interface Image {
  src: string;
}
