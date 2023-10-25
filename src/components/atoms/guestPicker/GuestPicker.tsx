import { useEffect, useState } from "react";
import { get } from "lodash";
import { isMobile } from "react-device-detect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateBookingGuests } from "@/redux/features/listingSlice/listingSlice";

import { IGuestPicker } from "@/components/atoms/guestPicker/types";

import PlusIcon from "../../../../public/images/plus.svg";
import MinusIcon from "../../../../public/images/minus.svg";
import GuestsIcon from "../../../../public/images/guests.svg";
import { useTranslations } from "next-intl";
import Typography from "../typography/Typography";

const GuestPicker = ({
  data,
  className = "",
  bodyClass = "",
  labelClass = "",
  contentClass = ""
}: IGuestPicker) => {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const bookingGuests  = useAppSelector((state) => state.listingReducer.bookingGuests);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const changeAdults = (type: string) => {
    if (type === "plus") {
      dispatch(
        updateBookingGuests({
          ...bookingGuests,
          adults: bookingGuests.adults + 1
        })
      );
    } else {
      get(data, "adults") > 1 &&
        dispatch(
          updateBookingGuests({
            ...bookingGuests,
            adults: bookingGuests.adults - 1
          })
        );
    }
  };

  const changeKids = (type: string) => {
    if (type === "plus") {
      dispatch(
        updateBookingGuests({ ...bookingGuests, kids: bookingGuests.kids + 1 })
      );
    } else {
      get(data, "kids") > 0 &&
        dispatch(
          updateBookingGuests({
            ...bookingGuests,
            kids: bookingGuests.kids - 1
          })
        );
    }
  };

  const changePets = () =>
    dispatch(
      updateBookingGuests({
        ...bookingGuests,
        pets: Number(!bookingGuests.pets)
      })
    );

  useEffect(() => {
    isMobile && setIsDropdownOpen(true);
  }, []);

  const ListComponent = () => {
    return (
      <li className="mb-5 lg:mb-0">
        <div className="flex justify-between items-center hover:bg-white active:bg-white active:text-gray-800">
          <div className="flex flex-col">
            <Typography variant="p3" element="span"> {t("adults")} </Typography>
            <Typography variant="p3" element="span" className="text-gray-500">({t("over18")})</Typography>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="border border-gray-800 rounded-full flex items-center justify-center"
              onClick={() => changeAdults("minus")}>
              <MinusIcon className="cursor-pointer" />
            </div>
            <Typography variant="p3" element="span" className="mx-2">{get(data, "adults")}</Typography>
            <div
              className="border border-gray-800 rounded-full flex items-center justify-center"
              onClick={() => changeAdults("plus")}>
              <PlusIcon className="cursor-pointer w-4" />
            </div>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className={`dropdown w-full ${className}`}>
      <label
        tabIndex={0}
        className={`cursor-pointer w-full flex items-center h-14 lg:h-full ${labelClass}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {!isMobile && <GuestsIcon />}
        <div className="flex flex-col lg:ml-3">
          <Typography
            variant="p3"
            element="span"
            className={`text-sm text-gray-600 ${isMobile &&
              (get(data, "adults") || get(data, "kids") || get(data, "pets")) &&
              "hidden"
              }`}>
            {t("guests")}
          </Typography>
          <div className={`flex ${contentClass}`}>
            {get(data, "adults") > 0 && (
              <Typography
                variant="p3"
                element="span"
                className="mr-2">
                {get(data, "adults")} {t("adults")}
              </Typography>
            )}
            {get(data, "kids") > 0 && (
              <Typography
                variant="p3"
                element="span"
                className="mr-2">
                {get(data, "kids")} {t("kids")}
              </Typography>
            )}
            {get(data, "pets") && <Typography variant="p3" element="span" className="mr-2">{t("pets")}</Typography>}
          </div>
        </div>
      </label>
      <ul tabIndex={0} className={`left-0 dropdown-content menu ${bodyClass}`}>
        <ListComponent />
        <li className="mb-5 lg:mb-0">
          <div className="flex justify-between items-center hover:bg-white active:bg-white active:text-gray-800">
            <div className="flex flex-col">
              <Typography variant="p3" element="span">{t("adults")}</Typography>
              <Typography variant="p4" element="span" className="text-gray-500">({t("over18")})</Typography>
            </div>
            <div className="flex items-center justify-center">
              <div
                className="border border-gray-800 rounded-full flex items-center justify-center"
                onClick={() => changeAdults("minus")}>
                <MinusIcon className="cursor-pointer" />
              </div>
              <Typography variant="p3" element="span" className="mx-2">{get(data, "adults")}</Typography>
              <div
                className="border border-gray-800 rounded-full flex items-center justify-center"
                onClick={() => changeAdults("plus")}>
                <PlusIcon className="cursor-pointer w-4" />
              </div>
            </div>
          </div>
        </li>
        <li className="mb-5 lg:mb-0">
          <div className="flex justify-between items-center hover:bg-white active:bg-white active:text-gray-800">
            <div className="flex flex-col">
              <Typography variant="p3" element="span" className="text-lg">{t("kids")}</Typography>
              <Typography variant="p4" element="span" className="text-gray-500">({t("0_17")})</Typography>
            </div>
            <div className="flex items-center justify-center">
              <div
                className="border border-gray-800 rounded-full flex items-center justify-center"
                onClick={() => changeKids("minus")}>
                <MinusIcon className="cursor-pointer" />
              </div>
              <Typography variant="p3" element="span" className="mx-2">{get(data, "kids")}</Typography>
              <div
                className="border border-gray-800 rounded-full flex items-center justify-center"
                onClick={() => changeKids("plus")}>
                <PlusIcon className="cursor-pointer w-4" />
              </div>
            </div>
          </div>
        </li>
        <li className="mb-5 lg:mb-0">
          <div className="flex justify-between items-center hover:bg-white active:bg-white active:text-gray-800">
            <Typography variant="p3" element="span">{t("pets")}</Typography>
            <input type="checkbox" className="toggle" onChange={changePets} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default GuestPicker;
