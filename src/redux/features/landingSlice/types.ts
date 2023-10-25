import { ILocationData } from "@/components/atoms/destinationSelect/types";

export interface ILandingState {
  entities: [];
  activePath?: string;
  loading: boolean;
  locations: ILocationData;
  isMinifyButtons: boolean;
  isShowHeaderButtons: boolean;
}
