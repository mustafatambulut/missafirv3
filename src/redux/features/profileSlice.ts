import { get } from "lodash";
import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUserData } from "@/components/atoms/userInfo/types";
import { IReservationItemProps } from "@/components/molecules/reservationItem/types";

interface ProfileState {
  user: IUserData;
  activeSection:
    | "info"
    | "reservations"
    | "password"
    | "reviews"
    | "wishlist"
    | "settings";
  reservations: IReservationItemProps[];
  selectedReservationId: null | string;
}

const initialState = {
  user: {
    avatar: "https://i.ibb.co/dm4mntF/avatar.jpg",
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    email: "johndoe@missafir.com",
    password: "MSFRV3",
    address: "A Sok. B Mah. C Sitesi No:12",
    phone: "+905121211212",
    birthDate: "01/01/1990",
    gender: "female"
  },
  // todo: test için eklendi düzenlenecek
  reservations: [
    {
      id: "1",
      title: "Outstanding Flat with Calming View at Nisantasi",
      code: "HMDY9WNE29",
      location: "İstanbul, Beyoğlu",
      essentials: ["2 Bedroom", "1 Bathroom", "120 m2"],
      address:
        "Firuzağa Mahallesi Kadirler Yokuşu No: 84 Floor: 3 Flat Number: 3 Beyoğlu / İstanbul",
      dates: {
        checkIn: { date: { month: "29 Mar", year: "2023" }, time: "14:00" },
        checkOut: { date: { month: "06 Apr", year: "2023" }, time: "11:00" }
      },
      nights: "8",
      guests: "3",
      extraPayments: [
        {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
          type: "Transfer",
          image:
            "https://i.ibb.co/2kSLN0N/2f2f51c052620da4421a020e22d76a7bb4b909563f8aca9d759547cbf0e17292db935970d182c0df2a7adfc0c589095050ec.jpg"
        },
        {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
          type: "Transfer",
          image:
            "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg"
        },
        {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
          type: "Transfer",
          image:
            "https://i.ibb.co/xYZxnWg/c8d3990e9dc294ea2e49dcdfb65a86ec6110c5d762b931ddc60231a83eff528cbcbd6019992c20f343b526e8a4f9917a9356.jpg"
        }
      ],
      paymentDetails: {
        detail: [
          { title: "9,803,75₺ x 11 nights", price: "27,987 ₺" },
          { title: "25% Discount", price: "-4,987 ₺" },
          { title: "Cleaning Fee", price: "400 ₺" },
          { title: "Extra Payments", price: "100 ₺" }
        ],
        total: "16,889 ₺"
      },
      price: { amount: "9,803₺", type: "11 night" },
      status: {
        type: "pending",
        color: "bg-warning",
        label: "Bekleniyor"
      },
      badges: [{ color: "primary", label: "M Homes" }],
      images: [
        {
          src: "https://i.ibb.co/2kSLN0N/2f2f51c052620da4421a020e22d76a7bb4b909563f8aca9d759547cbf0e17292db935970d182c0df2a7adfc0c589095050ec.jpg"
        },
        {
          src: "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg"
        },
        {
          src: "https://i.ibb.co/xYZxnWg/c8d3990e9dc294ea2e49dcdfb65a86ec6110c5d762b931ddc60231a83eff528cbcbd6019992c20f343b526e8a4f9917a9356.jpg"
        }
      ]
    },
    {
      id: "2",
      title: "Outstanding Flat with Calming View at Nisantasi",
      code: "HMDY9WNE29",
      location: "İstanbul, Beyoğlu",
      essentials: ["2 Bedroom", "1 Bathroom", "120 m2"],
      address:
        "Firuzağa Mahallesi Kadirler Yokuşu No: 84 Floor: 3 Flat Number: 3 Beyoğlu / İstanbul",
      dates: {
        checkIn: { date: { month: "29 Mar", year: "2023" }, time: "14:00" },
        checkOut: { date: { month: "06 Apr", year: "2023" }, time: "11:00" }
      },
      nights: "8",
      guests: "3",
      extraPayments: [
        {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
          type: "Transfer",
          image:
            "https://i.ibb.co/2kSLN0N/2f2f51c052620da4421a020e22d76a7bb4b909563f8aca9d759547cbf0e17292db935970d182c0df2a7adfc0c589095050ec.jpg"
        },
        {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
          type: "Transfer",
          image:
            "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg"
        },
        {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
          type: "Transfer",
          image:
            "https://i.ibb.co/xYZxnWg/c8d3990e9dc294ea2e49dcdfb65a86ec6110c5d762b931ddc60231a83eff528cbcbd6019992c20f343b526e8a4f9917a9356.jpg"
        }
      ],
      paymentDetails: {
        detail: [
          { title: "9,803,75₺ x 11 nights", price: "27,987 ₺" },
          { title: "25% Discount", price: "-4,987 ₺" },
          { title: "Cleaning Fee", price: "400 ₺" },
          { title: "Extra Payments", price: "100 ₺" }
        ],
        total: "16,889 ₺"
      },
      price: { amount: "9,803₺", type: "11 night" },
      status: {
        type: "cancelled",
        color: "bg-error",
        label: "İptal Edildi"
      },
      badges: [{ color: "secondary", label: "M VIP" }],
      images: [
        {
          src: "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg"
        },
        {
          src: "https://i.ibb.co/2kSLN0N/2f2f51c052620da4421a020e22d76a7bb4b909563f8aca9d759547cbf0e17292db935970d182c0df2a7adfc0c589095050ec.jpg"
        },
        {
          src: "https://i.ibb.co/xYZxnWg/c8d3990e9dc294ea2e49dcdfb65a86ec6110c5d762b931ddc60231a83eff528cbcbd6019992c20f343b526e8a4f9917a9356.jpg"
        }
      ]
    },
    {
      id: "3",
      title: "Outstanding Flat with Calming View at Nisantasi",
      code: "HMDY9WNE29",
      location: "İstanbul, Beyoğlu",
      essentials: ["2 Bedroom", "1 Bathroom", "120 m2"],
      address:
        "Firuzağa Mahallesi Kadirler Yokuşu No: 84 Floor: 3 Flat Number: 3 Beyoğlu / İstanbul",
      dates: {
        checkIn: { date: { month: "29 Mar", year: "2023" }, time: "14:00" },
        checkOut: { date: { month: "06 Apr", year: "2023" }, time: "11:00" }
      },
      nights: "8",
      guests: "3",
      extraPayments: [
        {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
          type: "Transfer",
          image:
            "https://i.ibb.co/2kSLN0N/2f2f51c052620da4421a020e22d76a7bb4b909563f8aca9d759547cbf0e17292db935970d182c0df2a7adfc0c589095050ec.jpg"
        },
        {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
          type: "Transfer",
          image:
            "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg"
        },
        {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
          type: "Transfer",
          image:
            "https://i.ibb.co/xYZxnWg/c8d3990e9dc294ea2e49dcdfb65a86ec6110c5d762b931ddc60231a83eff528cbcbd6019992c20f343b526e8a4f9917a9356.jpg"
        }
      ],
      paymentDetails: {
        detail: [
          { title: "9,803,75₺ x 11 nights", price: "27,987 ₺" },
          { title: "25% Discount", price: "-4,987 ₺" },
          { title: "Cleaning Fee", price: "400 ₺" },
          { title: "Extra Payments", price: "100 ₺" }
        ],
        total: "16,889 ₺"
      },
      price: { amount: "9,803₺", type: "11 night" },
      status: {
        type: "confirmed",
        color: "bg-success",
        label: "Onaylandı"
      },
      badges: [{ color: "primary", label: "M Homes" }],
      images: [
        {
          src: "https://i.ibb.co/xYZxnWg/c8d3990e9dc294ea2e49dcdfb65a86ec6110c5d762b931ddc60231a83eff528cbcbd6019992c20f343b526e8a4f9917a9356.jpg"
        },
        {
          src: "https://i.ibb.co/2kSLN0N/2f2f51c052620da4421a020e22d76a7bb4b909563f8aca9d759547cbf0e17292db935970d182c0df2a7adfc0c589095050ec.jpg"
        },
        {
          src: "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg"
        }
      ]
    }
  ],
  activeSection: "reservations",
  selectedReservationId: null
} as ProfileState;

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateActiveSection: (
      state: ProfileState,
      action: PayloadAction<
        | "info"
        | "reservations"
        | "password"
        | "reviews"
        | "wishlist"
        | "settings"
      >
    ) => {
      state.activeSection = action.payload;
      state.selectedReservationId = null;
    },
    updateSelectedReservationId: (
      state: ProfileState,
      action: PayloadAction<string>
    ) => {
      state.selectedReservationId = action.payload;
    }
  }
});
export const responseData = (state: RootState) => get(state, "profile.value");
export const { updateActiveSection, updateSelectedReservationId } =
  profileSlice.actions;
export default profileSlice.reducer;
