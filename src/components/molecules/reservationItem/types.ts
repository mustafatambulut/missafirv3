export interface IReservationItem {
  reservation: IReservationItemProps;
}

export interface IReservationItemProps {
  id: string;
  code: string;
  price: Price;
  dates: string;
  title: string;
  guests: string;
  status: Status;
  address: string;
  nights: string;
  extraPayments: IExtraPayments[];
  badges: Badge[];
  images: Image[];
  location: string;
  essentials: string[];
}

export interface Price {
  type: string;
  amount: string;
}

export interface Status {
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

export interface IExtraPayments {
  content: string;
  type: string;
  image: string;
}

export interface IPaymentDetail {
  title: string;
  price: string;
}

export interface IPaymentDetails {
  total: string;
  detail: IPaymentDetail[];
}
