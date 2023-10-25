"use client";
import { useEffect } from "react";
import split from "lodash/split";
import includes from "lodash/includes";
import { usePathname, useRouter } from "next/navigation";

import {
  checkIsAuthenticated,
  checkSameItem,
  getCurrentLang,
  getLocalStorage
} from "@/utils/helper";
import { LOCALES, PROTECTED, TOKEN_KEY } from "@/app/constants";

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const authCheck = () => {
    const lang = getCurrentLang();
    if (!checkIsAuthenticated()) {
      const isProtected = checkSameItem(PROTECTED, split(pathname, "/"));

      if (isProtected) {
        const hasLang = checkSameItem(split(pathname, "/"), LOCALES);
        router.push(`${!hasLang ? lang : ""}/login`);
        return;
      }
    } else {
      if (includes(split(pathname, "/"), "login")) router.push("/");
    }
  };

  useEffect(() => {
    authCheck();
  }, [getLocalStorage(TOKEN_KEY)]);

  return children;
};

export default RouteGuard;
