import { IReview } from "@/components/molecules/review/types";

export interface IReviewSection {
  review: Review;
  className?: string;
}

export interface Review {
  comments: IReview;
  total: number | string;
  averageRate: number | string;
}

export interface IReviewComponent {
  isModal?: boolean;
  className?: string;
}
