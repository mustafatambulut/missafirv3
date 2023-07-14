import React from "react";

export interface IBadge {
  children: React.ReactNode | React.ReactNode[] | string;
  className?: string;
  color: string;
}
