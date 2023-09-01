export interface IReview {
  className?: string;
  isModal?: boolean;
  data: Data[];
}

export interface Data {
  name: string;
  date: string | Date;
  comment: string;
  rate: string | number;
}
