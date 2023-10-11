"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setLinks } from "@/redux/features/listingDetailSlice/listingDetailSlice";
import { IListingDetailDataHandle } from "@/components/atoms/listingDetailDataHandle/types";

const ListingDetailDataHandle = ({ data }: IListingDetailDataHandle) => {
  const { links } = data;
  const dispatch = useDispatch();

  useEffect(() => {
    data && dispatch(setLinks(links));
  }, [data]);

  return <></>;
};

export default ListingDetailDataHandle;
