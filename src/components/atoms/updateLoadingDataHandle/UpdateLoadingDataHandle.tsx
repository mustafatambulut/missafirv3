"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  updateLoading,
  updateSearchClicked
} from "@/redux/features/listingSlice/listingSlice";

const UpdateLoadingDataHandle = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateLoading(false));
    dispatch(updateSearchClicked(false));
  }, []);

  return <></>;
};

export default UpdateLoadingDataHandle;
