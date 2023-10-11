"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { updateShowSearchbar } from "@/redux/features/listingSlice/listingSlice";

const UpdateSearchBarDataHandle = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateShowSearchbar(true));
    return () => {
      dispatch(updateShowSearchbar(false));
    };
  }, []);

  return <></>;
};

export default UpdateSearchBarDataHandle;
