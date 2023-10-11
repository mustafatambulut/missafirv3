"use client";
import { useEffect, useState } from "react";

import { getScrollPosition } from "@/utils/helper";

const usePageScroll = () => {
  const [isScrolledHeaderActive, setIsScrolledHeaderActive] =
    useState<boolean>(false);

  const handleScroll = () => {
    const scrollPosition = getScrollPosition();
    const requiredScrollPosition = 10;
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
