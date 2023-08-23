export interface IMessageState {
  isFavored?: boolean;
  chats: Array<Chats>;
  mockData: MockData;
  activeChat: {
    id: number;
  };
  isClickInbox?: boolean;
}

export interface Chats {
  id: number;
  date: string;
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
  inbox?: Inbox;
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

export interface Inbox {
  subTitle?: string;
}
