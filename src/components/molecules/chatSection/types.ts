import { Chats } from "@/redux/features/messageSlice/types";

export interface IChatSection {
  chats: Array<Chats>;
  className?: string;
}
