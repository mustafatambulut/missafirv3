"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { get, map, size } from "lodash";

import Button from "@/components/atoms/button/Button";
import SelectFilter from "@/components/atoms/selectFilter/SelectFilter";
import ReservationItem from "@/components/molecules/reservationItem/ReservationItem";

import PlaneIcon from "../../../../public/images/plane.svg";
import AllIcon from "../../../../public/images/circles.svg";
import PendingIcon from "../../../../public/images/waitround.svg";
import ConfirmedIcon from "../../../../public/images/confirmed.svg";
import CancelledIcon from "../../../../public/images/cancelled.svg";

const ReservationList = () => {
  const [activeFilter, setActiveFilter] = useState<number>(0);

  const filterOptionIconClass = (index: number): string => {
    return classNames("fill-gray", {
      "fill-primary": activeFilter === index
    });
  };

  const filterOptionButtonClass = (index: number): string => {
    return classNames(
      "outline-none px-0 text-xl cursor-pointer flex gap-x-3 items-center hover:text-gray text-gray transition-none",
      {
        "text-primary hover:text-primary": activeFilter === index
      }
    );
  };

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

  // todo: dil seçeneği ekleyince güncellenecek
  const filterOptions = [
    {
      attributes: {
        type: "filter",
        value: "all",
        label: "All",
        icon: <AllIcon className={filterOptionIconClass(0)} />
      }
    },
    {
      attributes: {
        type: "filter",
        value: "confirmed",
        label: "Confirmed",
        icon: <ConfirmedIcon className={filterOptionIconClass(1)} />
      }
    },
    {
      attributes: {
        type: "filter",
        value: "pending",
        label: "Pending",
        icon: <PlaneIcon className={filterOptionIconClass(2)} />
      }
    },
    {
      attributes: {
        type: "filter",
        value: "cancelled",
        label: "Cancelled",
        icon: <CancelledIcon className={filterOptionIconClass(3)} />
      }
    }
  ];
  return (
    <>
      <div className="grid grid-cols-1 gap-y-2">
        <div className="mt-4 lg:mt-0">
          <div className="hidden lg:flex gap-4">
            {map(filterOptions, (filter, key) => (
              <Button
                key={key}
                className={filterOptionButtonClass(key)}
                variant="btn-ghost"
                onClick={() => setActiveFilter(key)}>
                {get(filter, "attributes.icon")}
                <span>{get(filter, "attributes.label")}</span>
              </Button>
            ))}
          </div>
          <div className="lg:hidden flex justify-between">
            <SelectFilter />
          </div>
        </div>
        <div className="text-sm lg:text-lg text-gray-800">
          {/*// todo: dinamikleştirilecek*/}
          {size(mockReservations)} geçmiş rezervasyon
        </div>
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
