"use client";
import { useEffect } from "react";

import { checkIsAuthenticated } from "@/utils/helper";
import { useAppDispatch } from "@/redux/hooks";
import { STEP_1 } from "@/redux/features/reservationSlice/enum";
import { changeCurrentStep } from "@/redux/features/reservationSlice/reservationSlice";

const useCheckAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!checkIsAuthenticated()) dispatch(changeCurrentStep(STEP_1));
  }, []);
};

export default useCheckAuth;
