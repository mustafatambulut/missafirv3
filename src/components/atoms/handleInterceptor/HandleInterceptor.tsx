"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { UNAUTHORIZED } from "@/app/enum";
import { pmsApi } from "@/service/axiosInstances";
import { LANG_KEY, LOCALES } from "@/app/constants";
import { checkSameItem, getLocalStorage } from "@/utils/helper";

const HandleInterceptor = () => {
  const interceptorId = useRef(null);
  const router = useRouter();
  useEffect(() => {
    interceptorId.current = pmsApi.interceptors.response.use(
      undefined,
      (error) => {
        switch (error.response.status) {
          case UNAUTHORIZED: {
            const lang = getLocalStorage(LANG_KEY);
            const hasLang = lang ? checkSameItem([lang], LOCALES) : false;
            router.push(`${!hasLang ? lang : ""}/login`);
            break;
          }
        }
      }
    );

    return () => {
      pmsApi.interceptors.response.eject(interceptorId.current);
    };
  }, []);

  return null;
};

export default HandleInterceptor;
