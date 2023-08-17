import { ILocationData } from "@/components/atoms/destinationSelect/types";

export interface ILandingState {
  entities: [];
  loading: boolean;
  locations: ILocationData;
}
