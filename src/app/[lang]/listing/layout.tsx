import React from "react";

export default function ListingLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
