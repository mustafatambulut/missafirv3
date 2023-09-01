"use client";
import { ReactNode, useState } from "react";
import { get } from "lodash";
import classNames from "classnames";

import { IReview } from "@/components/molecules/review/types";

import Modal from "@/components/atoms/modal/Modal";
import Button from "@/components/atoms/button/Button";
import ReadMore from "@/components/atoms/readMore/ReadMore";

import StarIcon from "../../../../public/images/star.svg";
import RightIcon from "../../../../public/images/variants/small_right_arrow.svg";

const Review = ({ data, isModal = false, className = "" }: IReview) => {
  const [isOpen, setIsOpen] = useState(false);

  const articleClass = classNames("text-gray-600", {
    truncate: isModal
  });

  const handleShowMore = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const ContentByIsModal = (): ReactNode => {
    return (
      <article className={articleClass}>
        {isModal ? (
          get(data, "comment")
        ) : (
          <ReadMore className="my-2" type="text">
            {get(data, "comment")}
          </ReadMore>
        )}
      </article>
    );
  };

  const CommentComponent = ({ className = "" }: string): ReactNode => {
    return (
      <div className={`flex flex-col gap-y-3 ${className}`}>
        <header className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-base">{get(data, "name")}</span>
            <span className="text-xs text-gray-400">{get(data, "date")}</span>
          </div>
          <div className="flex gap-x-1 items-center">
            <span>
              <StarIcon className="fill-primary-500" />
            </span>
            <span className="text-xl">{get(data, "rate")}</span>
          </div>
        </header>
        <ContentByIsModal />
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col gap-y-3 border border-gray-200 rounded-xl px-4 pt-4 h-fit w-1/3 ${className}`}>
      <CommentComponent />
      {isModal && (
        <>
          <footer className="flex">
            <Button
              onClick={handleShowMore}
              variant="btn-ghost"
              className="text-15 text-primary font-mi-sans lg:px-0 gap-x-1"
              outline={true}>
              Show More <RightIcon />
            </Button>
          </footer>
          <Modal headerClass="text-2xl" isOpen={isOpen} setIsOpen={setIsOpen}>
            <CommentComponent className="border p-4 mt-6 rounded-xl" />
          </Modal>
        </>
      )}
    </div>
  );
};

export default Review;
