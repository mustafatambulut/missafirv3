import React from "react";

export interface ISection {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}
