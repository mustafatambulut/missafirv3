"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { updateIsShowHeaderButtons } from "@/redux/features/landingSlice/landingSlice";

const UpdateHeaderButtonsDataHandle = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateIsShowHeaderButtons(false));
    return () => {
      dispatch(updateIsShowHeaderButtons(false));
    };
  }, []);

  return <></>;
};

export default UpdateHeaderButtonsDataHandle;
