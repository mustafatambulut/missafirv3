import React from "react";
import { map, size } from "lodash";

import ReservationItem from "@/components/molecules/reservationItem/ReservationItem";

import PendingIcon from "../../../../public/images/waitround.svg";
import ConfirmedIcon from "../../../../public/images/confirmed.svg";
import CancelledIcon from "../../../../public/images/cancelled.svg";

const ReservationList = () => {
  // todo: test için eklendi silinecek
  const mockReservations = [
    {
      title: "Outstanding Flat with Calming View at Nisantasi",
      code: "HMDY9WNE29",
      location: "İstanbul, Beyoğlu",
      dates: "29 Mar-8 Apr",
      guests: "3 guests",
      price: { amount: "9,803₺", type: "11 night" },
      status: {
        icon: <PendingIcon className="fill-white" />,
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
      title: "Outstanding Flat with Calming View at Nisantasi",
      code: "HMDY9WNE29",
      location: "İstanbul, Beyoğlu",
      dates: "29 Mar-8 Apr",
      guests: "3 guests",
      price: { amount: "9,803₺", type: "11 night" },
      status: {
        icon: <ConfirmedIcon className="fill-white" />,
        type: "confirmed",
        color: "bg-success",
        label: "Onaylandı"
      },
      badges: [{ color: "primary", label: "M Homes" }],
      images: [
        {
          src: "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg"
        },
        {
          src: "https://i.ibb.co/xYZxnWg/c8d3990e9dc294ea2e49dcdfb65a86ec6110c5d762b931ddc60231a83eff528cbcbd6019992c20f343b526e8a4f9917a9356.jpg"
        },
        {
          src: "https://i.ibb.co/2kSLN0N/2f2f51c052620da4421a020e22d76a7bb4b909563f8aca9d759547cbf0e17292db935970d182c0df2a7adfc0c589095050ec.jpg"
        }
      ]
    },
    {
      title: "Outstanding Flat with Calming View at Nisantasi",
      code: "HMDY9WNE29",
      location: "İstanbul, Beyoğlu",
      dates: "29 Mar-8 Apr",
      guests: "3 guests",
      price: { amount: "9,803₺", type: "11 night" },
      status: {
        icon: <CancelledIcon className="fill-white" />,
        type: "cancelled",
        color: "bg-error",
        label: "İptal Edildi"
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
    },
    {
      title: "Outstanding Flat with Calming View at Nisantasi",
      code: "HMDY9WNE29",
      location: "İstanbul, Beyoğlu",
      dates: "29 Mar-8 Apr",
      guests: "3 guests",
      price: { amount: "9,803₺", type: "11 night" },
      status: {
        icon: <ConfirmedIcon className="fill-white" />,
        type: "confirmed",
        color: "bg-success",
        label: "Onaylandı"
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
      title: "Outstanding Flat with Calming View at Nisantasi",
      code: "HMDY9WNE29",
      location: "İstanbul, Beyoğlu",
      dates: "29 Mar-8 Apr",
      guests: "3 guests",
      price: { amount: "9,803₺", type: "11 night" },
      status: {
        icon: <ConfirmedIcon className="fill-white" />,
        type: "confirmed",
        color: "bg-success",
        label: "Onaylandı"
      },
      badges: [{ color: "primary", label: "M Homes" }],
      images: [
        {
          src: "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg"
        },
        {
          src: "https://i.ibb.co/xYZxnWg/c8d3990e9dc294ea2e49dcdfb65a86ec6110c5d762b931ddc60231a83eff528cbcbd6019992c20f343b526e8a4f9917a9356.jpg"
        },
        {
          src: "https://i.ibb.co/2kSLN0N/2f2f51c052620da4421a020e22d76a7bb4b909563f8aca9d759547cbf0e17292db935970d182c0df2a7adfc0c589095050ec.jpg"
        }
      ]
    }
  ];
  return (
    <>
      <div className="text-sm lg:text-lg text-gray-800">
        {/*// todo: dinamikleştirilecek*/}
        {size(mockReservations)} geçmiş rezervasyon
      </div>
      <div className="relative gap-y-5 flex flex-col">
        {map(mockReservations, (reservation, key) => (
          <ReservationItem reservation={reservation} key={key} />
        ))}
      </div>
    </>
  );
};

export default ReservationList;
