import moment from "moment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessageState } from "@/redux/features/messageSlice/types";

const initialState = {
  chats: [
    {
      id: 0,
      date: "21.08.2023",
      isRead: false,
      data: [
        {
          subject: "What is Lorem Ipsum?",
          start: {
            user: "JS",
            type: "customer",
            message:
              "Hi, I wanted to check with you if it's possible to check in at 2pm? I have a dental appointment at 2:30, the car is going to pick me up from your address, and I would like to leave my luggage there, as I'm checking out of my current place this morning.",
            datetime: moment(new Date()).format("LT").toString()
          },
          end: {
            user: "personel",
            type: "personel",
            message:
              "Hi, I wanted to check with you if it's possible to check in at 2pm?",
            datetime: moment(new Date()).format("LT").toString()
          }
        },
        {
          subject: "What is Lorem Ipsum?",
          start: {
            user: "JS",
            type: "customer",
            message: "lorem ipsum ",
            datetime: moment(new Date()).format("LT").toString()
          },
          end: {
            user: "personel",
            type: "personel",
            message:
              "Hi, I wanted to check with you if it's possible to check in at 2pm?",
            datetime: moment(new Date()).format("LT").toString()
          }
        }
      ]
    },
    {
      id: 1,
      date: "22.08.2023",
      isRead: true,
      data: [
        {
          start: {
            user: "MS",
            type: "customer",
            message: "BLA BLA BLA",
            datetime: moment(new Date()).format("LT").toString()
          },
          end: {
            user: "personel",
            type: "personel",
            message:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dumm",
            datetime: moment(new Date()).format("LT").toString()
          },
          subject: "Where does it come from?"
        },
        {
          start: {
            user: "MS",
            type: "customer",
            message: "lorem ipsum ",
            datetime: moment(new Date()).format("LT").toString()
          },
          end: {
            user: "personel",
            type: "personel",
            message: "Lorem Ipsum passages, and more recently with desktop",
            datetime: moment(new Date()).format("LT").toString()
          },
          subject: "Where does it come from?"
        }
      ]
    },
    {
      id: 2,
      date: "23.08.2023",
      isRead: false,
      data: [
        {
          start: {
            user: "JS",
            type: "customer",
            message:
              "took a galley of type and scrambled it to make a type specimen book",
            datetime: moment(new Date()).format("LT").toString()
          },
          end: {
            user: "personel",
            type: "personel",
            message:
              " but also the leap into electronic typesetting, remaining essentially unchanged",
            datetime: moment(new Date()).format("LT").toString()
          },
          subject: "Historical Central Flat in Beyoğlu"
        },
        {
          start: {
            user: "JS",
            type: "customer",
            message: "lorem ipsum ",
            datetime: moment(new Date()).format("LT").toString()
          },
          end: {
            user: "personel",
            type: "personel",
            message:
              "Hi, I wanted to check with you if it's possible to check in at 2pm?",
            datetime: moment(new Date()).format("LT").toString()
          },
          subject: "Historical Central Flat in Beyoğlu"
        }
      ]
    }
  ],
  isFavored: false,
  activeChat: {
    id: 0
  },
  isClickInbox: false,
  mockData: {
    title: "Outstanding Flat with Calming View at Nisantasi",
    location: "İstanbul, Beyoğlu",
    status: "Completed",
    benefits: ["6 guests", "2 baths", "120m2"],
    badges: [
      {
        color: "primary",
        label: "M Homes"
      }
    ],
    amount: "16,789₺",
    availability: {
      title: "Available Today",
      date: ""
    },
    images: [
      "https://i.ibb.co/2kSLN0N/2f2f51c052620da4421a020e22d76a7bb4b909563f8aca9d759547cbf0e17292db935970d182c0df2a7adfc0c589095050ec.jpg",
      "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg",
      "https://i.ibb.co/xYZxnWg/c8d3990e9dc294ea2e49dcdfb65a86ec6110c5d762b931ddc60231a83eff528cbcbd6019992c20f343b526e8a4f9917a9356.jpg"
    ]
  }
} as IMessageState;

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    changeFavored: (state: IMessageState, action: PayloadAction<boolean>) => {
      state.isFavored = action.payload;
    },
    changeActiveChatId: (
      state: IMessageState,
      action: PayloadAction<boolean>
    ) => {
      state.activeChat.id = action.payload;
    },
    changeClickInbox: (
      state: IMessageState,
      action: PayloadAction<boolean>
    ) => {
      state.isClickInbox = action.payload;
    }
  }
});

export const { changeFavored, changeClickInbox, changeActiveChatId } =
  messageSlice.actions;
export default messageSlice.reducer;
