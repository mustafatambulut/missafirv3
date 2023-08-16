"use client";
import { useState, useEffect } from "react";
import { includes, split } from "lodash";
import { usePathname, useRouter } from "next/navigation";

import { LOCALES, PROTECTED } from "@/app/constants";
import { checkSameItem, getCurrentLang, getLocalStorage } from "@/utils/helper";

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  const authCheck = () => {
    const lang = getCurrentLang();

    if (!getLocalStorage("token")) {
      const isProtected = checkSameItem(PROTECTED, split(pathname, "/"));

      if (isProtected) {
        setAuthorized(false);
        const hasLang = checkSameItem(split(pathname, "/"), LOCALES);
        router.push(`${!hasLang ? lang : ""}/login`);
        return;
      }
      setAuthorized(true);
    }

    if (getLocalStorage("token")) {
      includes(split(pathname, "/"), "login")
        ? router.push("/")
        : setAuthorized(true);
    }
  };

  useEffect(() => {
    authCheck();
  }, [getLocalStorage("token")]);

  return includes(split(pathname, "/"), "login")
    ? children
    : authorized && children;
};

export default RouteGuard;
