import Button from "@/components/atoms/button/Button";
import { useState } from "react";

const ReservationComments = () => {
  const [review, setReview] = useState<string>("");
  return (
    <div className="mt-8">
      <div className="mb-8">
        <div className="text-base lg:text-28 font-mi-sans-semi-bold text-gray-800">
          Your Review
        </div>
        <div className="text-xs lg:text-xl text-gray-600 mt-2">No review yet</div>
      </div>

      <div>
        <div className="text-gray-700 text-sm lg:text-lg">
          How was it your experience?
        </div>
        <div className="flex flex-col lg:flex-row rounded-xl b border items-end gap-3 mt-3 p-2">
          <textarea
            onChange={(e) => setReview(e.target.value)}
            value={review}
            className="text-sm lg:text-xl text-gray-600 font-mi-sans-semi-bold textarea textarea-lg flex-1 w-full outline-none rounded-xl p-2"
            placeholder="Add review..."></textarea>
          {review.length > 0 && (
            <Button variant="btn-primary" className="text-sm lg:text-2xl">
              Send
            </Button>
          )}
        </div>
      </div>

      <div className="hidden">
        <div className="mb-8">
          <div className="text-base lg:text-28 font-mi-sans-semi-bold text-gray-800">
            Comments(1)
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <div className="rounded-full shadow-thin-blur-10 w-[40px] h-[40px] flex justify-center items-center text-gray-600 text-base">
            JD
          </div>
          <div className="flex-1 rounded-xl b border text-sm lg:text-xl font-mi-sans-semi-bold text-gray-600 p-3">
            Hi, I wanted to check with you if its possible to check in at 2pm? I
            have a dental appointment at 2:30, the car is going to pick me up
            from your address.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationComments;
