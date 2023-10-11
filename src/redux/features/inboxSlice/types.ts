export interface IMessageState {
  isFavored?: boolean;
  threadList: any[];
  threadDetails: any;
  selectedThreadId: any;
  threadListLoading: boolean;
  threadDetailsLoading: boolean;
  sendMessageLoading: boolean;
  notFound: boolean;
  selectedThread: any;
  pagination: any;
}

export interface Chats {
  id: number;
  date: string;
  isRead?: boolean;
  data: Array<Data>;
}

export interface Data {
  start: Messages;
  end: Messages;
  subject: string;
}

export interface Messages {
  user: string;
  type: string;
  messages: string;
  datetime: string;
}

export interface MockData {
  title?: string;
  location?: string;
  status?: string;
  benefits?: string[];
  badges?: Badge[];
  amount?: string;
  availability?: Availability;
  images?: string[];
}

export interface Availability {
  title?: string;
  date?: string;
}

export interface Badge {
  color?: string;
  label?: string;
}
