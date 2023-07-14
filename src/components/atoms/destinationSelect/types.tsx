import React from "react";

export interface IDestinationSelect {
  componentId: string;
  setBookingDestination: React.Dispatch<React.SetStateAction<string>>;
  setSkipButtonVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveSearchItem: React.Dispatch<React.SetStateAction<string>>;
}
//
// export interface Props {
//   props?: {
//     data?: {
//       isPopularDestinations?: boolean;
//     };
//     children?: string;
//   } | null;
// }