"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { IDataHandle } from "@/components/atoms/dataHandle/types";
import { setDetail } from "@/redux/features/reservationSlice/reservationSlice";

const DataHandle = ({ res }: IDataHandle) => {
  const dispatch = useDispatch();

  useEffect(() => {
    res && dispatch(setDetail(res));
  }, [res]);

  return <></>;
};

export default DataHandle;
