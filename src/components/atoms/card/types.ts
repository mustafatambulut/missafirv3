import React from "react";
export interface ICard {
  children: React.ReactNode;
  className?: string;
  cardBodyClassName?: string;
  style?: React.CSSProperties;
}
