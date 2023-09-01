"use client";
import { ReactNode, useState } from "react";
import { get, map } from "lodash";
import dynamic from "next/dynamic";

import {
  IReviewSection,
  IReviewComponent
} from "@/components/molecules/reviewSection/types";

import Button from "@/components/atoms/button/Button";
import Review from "@/components/molecules/review/Review";

import StarIcon from "../../../../public/images/star.svg";
import RightIcon from "../../../../public/images/variants/chevron_right.svg";

const ReviewSection = ({ review, className = "" }: IReviewSection) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const Modal = dynamic(() => import("@/components/atoms/modal/Modal"), {
    ssr: false
  });

  const handleShowMore = (e) => {
    e.stopPropagation();
    setShowAllReviews(true);
  };

  const ReviewsComponent = ({
    isModal,
    className = ""
  }: IReviewComponent): ReactNode => {
    return map(get(review, "comments"), (comment, key) => (
      <Review
        key={key}
        data={comment}
        isModal={isModal}
        className={className}
        showAllReviews={showAllReviews}
        setShowAllReviews={setShowAllReviews}
      />
    ));
  };

  const RateComponent = (): ReactNode => {
    return (
      <div className="text-2xl flex gap-x-2 items-center">
        <span className="flex items-center gap-x-1">
          <StarIcon className="fill-gray-900" />
          {get(review, "averageRate")}
        </span>
        <div className="w-1 h-1 rounded-full bg-gray-800"></div>
        <span>{get(review, "total")} Reviews</span>
      </div>
    );
  };

  return (
    <section className={`flex flex-col gap-y-9 ${className}`}>
      <header>
        <RateComponent />
      </header>
      <article className="flex flex-wrap gap-4 w-fit">
        <ReviewsComponent isModal={true} />
      </article>
      <div className="-mt-5">
        <Button
          outline={true}
          variant="btn-ghost"
          onClick={handleShowMore}
          className="items-center text-primary text-lg font-mi-sans lg:px-0 gap-x-1">
          Show More <RightIcon />
        </Button>
        <Modal
          label={<RateComponent />}
          headerClass="text-2xl"
          isOpen={showAllReviews}
          setIsOpen={setShowAllReviews}>
          <div className="flex flex-col gap-y-6 mt-6">
            <ReviewsComponent isModal={false} className="w-full" />
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default ReviewSection;
