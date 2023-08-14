import { Sliders } from "@/components/molecules/techExperience/types";

export interface ITabContent {
  content: Sliders;
  className?: string;
  id: number | string;
  activeTab: number | string;
}
