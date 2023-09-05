import { get, map } from "lodash";
import classNames from "classnames";
import {
  updateCurrentStep,
  updateSelectedOwnerType
} from "@/redux/features/ownerSlice/ownerSlice";
import { STEP_2 } from "@/redux/features/ownerSlice/enum";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import IndividualIcon from "../../../../public/images/individual.svg";

const BecomeOwnerTypes = () => {
  const dispatch = useAppDispatch();
  const { selectedOwnerType, ownerTypes } = useAppSelector(
    (state) => state.ownerReducer
  );
  const ownerTypeClass = (type) => {
    return classNames(
      "rounded-lg lg:rounded-20 text-xl font-mi-sans-semi-bold w-1/2 py-2 px-3 lg:py-6 lg:px-6 cursor-pointer flex flex-col gap-y-3 justify-center items-center",
      {
        "text-primary bg-primary-25": type === selectedOwnerType,
        "text-gray-500": type !== selectedOwnerType
      }
    );
  };

  const handleChangeOwnerType = (ownerType) => {
    selectedOwnerType !== STEP_2 && dispatch(updateCurrentStep(STEP_2));
    dispatch(updateSelectedOwnerType(ownerType));
  };
  return (
    <div className="flex gap-x-4 w-full">
      {map(ownerTypes, (ownerType) => (
        <div
          onClick={() => handleChangeOwnerType(get(ownerType, "type"))}
          className={ownerTypeClass(get(ownerType, "type"))}>
          <IndividualIcon
            className={`${
              get(ownerType, "type") === selectedOwnerType
                ? "fill-primary"
                : "fill-gray-500"
            }`}
          />
          <span className="text-sm">{ownerType.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BecomeOwnerTypes;
