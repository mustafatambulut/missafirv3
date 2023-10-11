import Button from "@/components/atoms/button/Button";
import { useTranslations } from "next-intl";
import { useState } from "react";

const ReservationComments = () => {
  const [review, setReview] = useState<string>("");
  const t = useTranslations()
  return (
    <div className="mt-8">
      <div className="mb-8">
        <div className="text-base lg:text-28 font-mi-sans-semi-bold text-gray-800">
          {t("your_review")}
        </div>
        <div className="text-xs lg:text-xl text-gray-600 mt-2">{t("no_review_yet")}</div>
      </div>

      <div>
        <div className="text-gray-700 text-sm lg:text-lg">
          {t("how_was_it_your_experience")}
        </div>
        <div className="flex flex-col lg:flex-row rounded-xl b border items-end gap-3 mt-3 p-2">
          <textarea
            onChange={(e) => setReview(e.target.value)}
            value={review}
            className="text-sm lg:text-xl text-gray-600 font-mi-sans-semi-bold textarea textarea-lg flex-1 w-full outline-none rounded-xl p-2"
            placeholder="Add review..."></textarea>
          {review.length > 0 && (
            <Button variant="btn-primary" className="text-sm lg:text-2xl">
              {t("send")}
            </Button>
          )}
        </div>
      </div>

      <div className="hidden">
        <div className="mb-8">
          <div className="text-base lg:text-28 font-mi-sans-semi-bold text-gray-800">
            {t("comments")}(1)
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <div className="rounded-full shadow-thin-blur-10 w-[40px] h-[40px] flex justify-center items-center text-gray-600 text-base">
            JD
          </div>
          <div className="flex-1 rounded-xl b border text-sm lg:text-xl font-mi-sans-semi-bold text-gray-600 p-3">
            {t("example_comment")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationComments;
