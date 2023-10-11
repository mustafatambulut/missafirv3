import {
  UPCOMING,
  STAYING,
  CHECKED_OUT,
  CANCELLED,
  INQUIRY
} from "@/components/molecules/inboxCard/constants";

export interface IInboxCard {
  date?: string;
  onClick?: void;
  subject?: string;
  message?: string;
  imageSrc?: boolean;
  isRead?: boolean;
  showStatus?: boolean;
  status?: UPCOMING | STAYING | CHECKED_OUT | CANCELLED | INQUIRY;
  statusDate?: string;
  imageClass?: string;
  className?: string;
}
