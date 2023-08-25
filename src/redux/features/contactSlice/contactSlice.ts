import { createSlice } from "@reduxjs/toolkit";
import { IContactState } from "@/redux/features/contactSlice/types";

const initialState = {
  header: {
    title: "We’d love to hear from you",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
  },
  contactBody: {
    title: "OUR CONTACT INFO’S",
    subTitle: {
      partialFirst: "Call us",
      partialSecond: "and we offer solutions for you"
    }
  },
  contactInfo: [
    {
      img: "/images/flags/turkish.svg",
      title: "Turkey",
      phone: "0 (850) 888 08 13",
      email: "info@missafir.com",
      address: "İTÜ Çekirdek, 34467"
    },
    {
      img: "/images/flags/montenegrin.svg",
      title: "Montenegro",
      phone: "0 (850) 999 08 13",
      email: "info@missafir.com",
      address: "İTÜ Çekirdek, 34467"
    },
    {
      img: "/images/flags/english.svg",
      title: "England",
      phone: "0 (850) 888 08 13",
      email: "info@missafir.com",
      address: "İTÜ Çekirdek, 34467"
    },
    {
      img: "/images/flags/turkish.svg",
      title: "Turkey- 2",
      phone: "0 (850) 888 08 13",
      email: "info@missafir.com",
      address: "İTÜ Çekirdek, 34467"
    },
    {
      img: "/images/flags/montenegrin.svg",
      title: "Montenegro - 2",
      phone: "0 (850) 999 08 13",
      email: "info@missafir.com",
      address: "İTÜ Çekirdek, 34467"
    }
  ]
} as IContactState;

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {}
});

export default contactSlice.reducer;
