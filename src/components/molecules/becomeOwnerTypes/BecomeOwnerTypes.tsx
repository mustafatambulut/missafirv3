import { get, map } from "lodash";
import classNames from "classnames";
import {
  updateCurrentStep,
  updateSelectedCountry,
  updateSelectedOwnerType
} from "@/redux/features/ownerSlice/ownerSlice";
import {
  OWNER_TYPE_1,
  OWNER_TYPE_2,
  STEP_1,
  STEP_2
} from "@/redux/features/ownerSlice/enum";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import IndividualIcon from "../../../../public/images/individual.svg";
import CorporationIcon from "../../../../public/images/corporation.svg";
import { useTranslations } from "next-intl";
import Typography from "@/components/atoms/typography/Typography";

const BecomeOwnerTypes = ({
  showCountrySelectOnChange = false
}: {
  showCountrySelectOnChange?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const { selectedOwnerType } = useAppSelector((state) => state.ownerReducer);
  const ownerTypeClass = (type) => {
    return classNames(
      "rounded-lg lg:rounded-20 text-xl font-mi-sans-semi-bold w-1/2 py-2 px-3 lg:py-6 lg:px-6 cursor-pointer flex flex-col gap-y-3 justify-center items-center",
      {
        "text-primary bg-primary-25": type === selectedOwnerType,
        "text-gray-500": type !== selectedOwnerType
      }
    );
  };

  const ownerTypes = [
    { type: OWNER_TYPE_1, label: t("i_want_to_rent_my_home") },
    {
      type: OWNER_TYPE_2,
      label: t("we_are_a_corporation")
    }
  ];

  const handleChangeOwnerType = (ownerType) => {
    if (showCountrySelectOnChange) {
      dispatch(updateCurrentStep(STEP_1));
      dispatch(updateSelectedOwnerType(ownerType));
      dispatch(updateSelectedCountry(null));
    } else {
      dispatch(updateCurrentStep(STEP_2));
    }
    dispatch(updateSelectedOwnerType(ownerType));
  };

  const renderOwnerIcons = (ownerType, isSelected) => {
    switch (ownerType) {
      case OWNER_TYPE_1:
        return (
          <IndividualIcon
            className={`${isSelected ? "fill-primary" : "fill-gray-500"}`}
          />
        );
      case OWNER_TYPE_2:
        return (
          <CorporationIcon
            className={`${isSelected ? "fill-primary" : "fill-gray-500"}`}
          />
        );
      default:
        <IndividualIcon
          cclassName={`${isSelected ? "fill-primary" : "fill-gray-500"}`}
        />;
    }
  };
  return (
    <div className="flex gap-x-4 w-full">
      {map(ownerTypes, (ownerType, key) => (
        <div
          key={key}
          onClick={() => handleChangeOwnerType(get(ownerType, "type"))}
          className={ownerTypeClass(get(ownerType, "type"))}>
          {renderOwnerIcons(
            get(ownerType, "type"),
            get(ownerType, "type") === selectedOwnerType
          )}

          <Typography variant="p5" element="span" className="text-sm">
            {ownerType.label}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default BecomeOwnerTypes;
