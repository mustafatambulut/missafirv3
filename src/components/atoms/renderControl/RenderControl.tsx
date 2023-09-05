import React from "react";
import { get } from "lodash";

import { IRenderControl } from "@/components/atoms/renderControl/types";

import Button from "@/components/atoms/button/Button";

//todo: minimum stay için eklendi düzenlenince aktif edilecek
//import RoundedInfo from "../../../../public/images/rounded_info.svg";

const RenderControl = ({
  bookingDate,
  setBookingDate,
  className = ""
}: IRenderControl) => {
  return (
    <section
      className={`w-full flex justify-between items-center p-2 bg-white text-gray-600 rounded-xl min-h-[30px] ${className}`}>
      <div>
        {/*todo: minimum stay için, düzenlenecek*/}
        {/*{dayInfo && (*/}
        {/*  <div className="text-black flex items-center text-sm">*/}
        {/*    <RoundedInfo className="mr-2" /> Minimum stay for check-in on{" "}*/}
        {/*    {dayInfo} is 2 nights.*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
      {console.log(bookingDate)}
      {/*{(get(bookingDate, "startDate") || get(bookingDate, "endDate")) && (*/}
      {/*  <div className="flex">*/}
      {/*    <Button*/}
      {/*      onClick={() => setBookingDate({ startDate: null, endDate: null })}*/}
      {/*      variant="btn-link"*/}
      {/*      className="text-gray-600 bg-transparent shadow-none border-none">*/}
      {/*      Clear*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*)}*/}
    </section>
  );
};

export default RenderControl;
