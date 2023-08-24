"use client";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import { getScrollPosition } from "@/utils/helper";

const usePageScroll = () => {
  const [isScrolledHeaderActive, setIsScrolledHeaderActive] =
    useState<boolean>(false);

  const handleScroll = () => {
    const scrollPosition = getScrollPosition();
    const requiredScrollPosition = isMobile ? 10 : 30;
    setIsScrolledHeaderActive(scrollPosition > requiredScrollPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { handleScroll, isScrolledHeaderActive };
};

export default usePageScroll;
