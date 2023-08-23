import {
  NOT_CHECK_IN,
  DONE_CHECK_IN,
  DONE_CHECK_OUT
} from "@/components/molecules/inboxCard/constants";

export interface IInboxCard {
  date?: string;

  onClick?: void;
  subject?: string;
  message?: string;
  imageSrc?: boolean;
  isNotify?: boolean;
  showStatus?: boolean;
  status?: NOT_CHECK_IN | DONE_CHECK_IN | DONE_CHECK_OUT;
  statusDate?: string;
  imageClass?: string;
  className?: string;
}
