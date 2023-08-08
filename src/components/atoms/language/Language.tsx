"use client";
import { useEffect } from "react";

const Language = ({ lang }: string) => {
  useEffect(() => {
    if (lang) localStorage.setItem("lang", lang);
  }, [lang]);
  return <></>;
};

export default Language;
