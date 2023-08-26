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
  ],
  formItems: [
    {
      type: "text",
      name: "fullname",
      placeholder: "Full name",
      label: "Full name"
    },
    {
      type: "email",
      name: "email",
      placeholder: "E-mail",
      label: "E-mail"
    },
    {
      type: "phone",
      name: "phone",
      placeholder: "+90 (___) ___ __ __",
      label: "Phone"
    },
    {
      type: "text",
      name: "subject",
      placeholder: "Subject",
      label: "What is the subject you want to communicate?"
    },
    {
      type: "textarea",
      name: "details",
      placeholder: "Details",
      label: `Can you give detailed information about the subject you want to contact?`
    },
    {
      type: "button",
      label: "Send"
    }
  ],
  banner: {
    formItems: [
      {
        type: "email",
        name: "email",
        placeholder: "Enter e-mail"
      },
      {
        type: "button",
        label: "Subscribe"
      }
    ],
    title: "Sign up for our newsletter",
    description:
      "Be the first to know about releases and industry news and insights."
  }
} as IContactState;

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {}
});

export default contactSlice.reducer;
