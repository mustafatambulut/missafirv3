"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { updateIsMinifyButtons } from "@/redux/features/landingSlice/landingSlice";

const UpdateMinifyButtonsDataHandle = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateIsMinifyButtons(true));
    return () => {
      dispatch(updateIsMinifyButtons(false));
    };
  }, []);

  return <></>;
};

export default UpdateMinifyButtonsDataHandle;
