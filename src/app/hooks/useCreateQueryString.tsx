"use client";
import { useCallback } from "react";
import { forEach, isNil, omitBy } from "lodash";
import { useSearchParams } from "next/navigation";

import { IuseCreateQueryString } from "@/app/hooks/types";

const useCreateQueryString = (queries): IuseCreateQueryString => {
  const searchParams = useSearchParams();
  // console.log("searchParams",searchParams.toString());
  const params = new URLSearchParams(searchParams);

  const createQueryString = useCallback(
    (queries) => {
      const cleanedQueries = omitBy(queries, isNil);

      forEach(Object.entries(cleanedQueries), ([name, value]) => {
        params.set(name, value);
      });
      // console.log("query", params.toString());
      return params.toString();
    },
    [searchParams]
  );

  return createQueryString(queries);
};

export default useCreateQueryString;
