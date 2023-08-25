"use client";
import { useEffect } from "react";
import { includes, split } from "lodash";
import { usePathname, useRouter } from "next/navigation";

import {
  checkSameItem,
  getCurrentLang,
  getSessionStorage
} from "@/utils/helper";
import { LOCALES, PROTECTED } from "@/app/constants";

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const authCheck = () => {
    const lang = getCurrentLang();
    if (!getSessionStorage("token")) {
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
  }, [getSessionStorage("token")]);

  return children;
};

export default RouteGuard;
