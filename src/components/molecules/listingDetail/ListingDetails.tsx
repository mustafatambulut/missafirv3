"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { get, map } from "lodash";
import { isMobile } from "react-device-detect";

import Badge from "@/components/atoms/badge/Badge";
import Slider from "@/components/molecules/slider/Slider";

import "./ListingDetails.css";

import PreviousIcon from "../../../../public/images/chevron-left.svg";
import NextIcon from "../../../../public/images/chevron-right.svg";
import Section from "@/components/molecules/section/Section";

const CustomNavigation = () => {
  return (
    <>
      <div className="listing-details swiper-button-prev rounded-full shadow after:hidden hidden lg:flex h-20 w-10 z-10 top-10 right-auto left-5 bg-primary-100 border-primary-100">
        <PreviousIcon className="fill-primary scale-50" />
      </div>
      <div className="listing-details swiper-button-next rounded-full shadow after:hidden hidden lg:flex h-20 w-10 z-10 top-10 left-auto right-5 bg-primary-100 border-primary-100">
        <NextIcon className="fill-primary scale-50" />
      </div>
    </>
  );
};
const customPagination = {
  clickable: true,
  renderBullet: function (index: any, className: any) {
    return `<span class="${className}"></span>`;
  }
};
const ListingDetails = () => {
  const [activeTab, setActiveTab] = useState(0);

  const listingsData = {
    header: {
      title: "Kusursuz bir konaklama için en iyi kiralık ev ve villalar",
      description:
        "İş seyahati, yeni keşifler ve tatil için kiralık ev bakınıyorsanız, sizin için en iyilerini seçtik."
    },
    body: {
      tabItems: [
        {
          label: "Conservative",
          image: "https://svgshare.com/i/vGN.svg"
        },
        {
          label: "Infant Friendly",
          image: "https://svgshare.com/i/vFp.svg"
        },
        {
          label: "Special Concept",
          image: "https://svgshare.com/i/vGN.svg"
        },
        {
          label: "Luxury Villas",
          image: "https://svgshare.com/i/vDC.svg"
        },
        {
          label: "Friendly",
          image: "https://svgshare.com/i/vFf.svg"
        },
        {
          label: "Business Friendly",
          image: "https://svgshare.com/i/vG0.svg"
        },
        {
          label: "VIP",
          image: "https://svgshare.com/i/vGN.svg"
        },
        {
          label: "Friendly",
          image: "https://svgshare.com/i/vFf.svg"
        },
        {
          label: "Business Friendly",
          image: "https://svgshare.com/i/vG0.svg"
        },
        {
          label: "VIP",
          image: "https://svgshare.com/i/vGN.svg"
        },
        {
          label: "Friendly",
          image: "https://svgshare.com/i/vFf.svg"
        },
        {
          label: "Business Friendly",
          image: "https://svgshare.com/i/vG0.svg"
        }
      ],
      tabContent: [
        {
          listings: [
            {
              title: "Outstanding Flat with Calming View at Nisantasi",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
              title: "Villa 1",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              title: "Villa 2",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
            }
          ]
        },
        {
          listings: [
            {
              title: "Outstanding Flat with Calming View at Nisantasi asdasd",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
              images: [
                {
                  src: "https://i.ibb.co/2kSLN0N/2f2f51c052620da4421a020e22d76a7bb4b909563f8aca9d759547cbf0e17292db935970d182c0df2a7adfc0c589095050ec.jpg"
                },
                {
                  src: "https://i.ibb.co/xYZxnWg/c8d3990e9dc294ea2e49dcdfb65a86ec6110c5d762b931ddc60231a83eff528cbcbd6019992c20f343b526e8a4f9917a9356.jpg"
                },
                {
                  src: "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg"
                }
              ]
            },
            {
              title: "Villa 1",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
              images: [
                {
                  src: "https://i.ibb.co/2kSLN0N/2f2f51c052620da4421a020e22d76a7bb4b909563f8aca9d759547cbf0e17292db935970d182c0df2a7adfc0c589095050ec.jpg"
                },
                {
                  src: "https://i.ibb.co/xYZxnWg/c8d3990e9dc294ea2e49dcdfb65a86ec6110c5d762b931ddc60231a83eff528cbcbd6019992c20f343b526e8a4f9917a9356.jpg"
                },
                {
                  src: "https://i.ibb.co/ZcvGfqT/7088b05eb69889b0f0e2de41d7f3d46d4f3f39ace7e11432c8f8b317f4796119bdeb6542f7ae62ed2121fe5d0bf9b4097f02.jpg"
                }
              ]
            },
            {
              title: "Villa 2",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
            }
          ]
        },
        {
          listings: [
            {
              title: "Outstanding Flat with Calming View at Nisantasi",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
              title: "Villa 1",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              title: "Villa 2",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
          ]
        },
        {
          listings: [
            {
              title: "Outstanding Flat with Calming View at Nisantasi",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
              title: "Villa 1",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              title: "Villa 2",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
          ]
        },
        {
          listings: [
            {
              title: "Outstanding Flat with Calming View at Nisantasi",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
              title: "Villa 1",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              title: "Villa 2",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
          ]
        },
        {
          listings: [
            {
              title: "Outstanding Flat with Calming View at Nisantasi",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
              title: "Villa 1",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              title: "Villa 2",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
          ]
        },
        {
          listings: [
            {
              title: "Outstanding Flat with Calming View at Nisantasi",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
              title: "Villa 1",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              title: "Villa 2",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
          ]
        },
        {
          listings: [
            {
              title: "Outstanding Flat with Calming View at Nisantasi",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
              title: "Villa 1",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              title: "Villa 2",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
          ]
        },
        {
          listings: [
            {
              title: "Outstanding Flat with Calming View at Nisantasi",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
              title: "Villa 1",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              title: "Villa 2",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
          ]
        },
        {
          listings: [
            {
              title: "Outstanding Flat with Calming View at Nisantasi",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
              title: "Villa 1",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              title: "Villa 2",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
          ]
        },
        {
          listings: [
            {
              title: "Outstanding Flat with Calming View at Nisantasi",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
              title: "Villa 1",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              title: "Villa 2",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
          ]
        },
        {
          listings: [
            {
              title: "Outstanding Flat with Calming View at Nisantasi",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
              title: "Villa 1",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "primary", label: "M Homes" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available on", date: "09 Aug" },
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
              title: "Villa 2",
              location: "İstanbul, Beyoğlu",
              benefits: ["6 guests", "2 baths", "120m2"],
              badges: [{ color: "secondary", label: "M Vip" }],
              price: { amount: "9,803₺", type: "nightly" },
              availability: { title: "Available Today", date: "" },
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
          ]
        }
      ]
    }
  };

  return (
    <>
      {listingsData && (
        <Section
          className="px-4 lg:px-8 mt-14"
          title={get(listingsData, "header.title")}
          description={get(listingsData, "header.description")}>
          <div className="tab-container w-full">
            <div className="tabs w-full flex shadow-[0px_2px_20px_0px_#bababa1a] lg:shadow-[0px_2px_20px_0px_#0000001A] h-28 rounded-2xl">
              <Slider
                sliderIdentifier="listing-details"
                slidesPerView={isMobile ? 3 : 7}
                spaceBetween={0}
                sliderContainerClassName="h-full w-full px-5 lg:px-10"
                sliderWrapperClassName="h-full"
                customNavigation={<CustomNavigation />}>
                {map(get(listingsData, "body.tabItems"), (listingTab, key) => (
                  <a
                    key={key}
                    className={`tab border-b-none text-grey-600 text-sm lg:text-xl lg:pb-2 px-0 h-full w-full flex flex-col items-center ${
                      key === activeTab
                        ? "tab-active text-primary"
                        : "border-b-transparent"
                    }`}
                    onClick={() => setActiveTab(key)}>
                    <Image
                      className="mb-2"
                      src={listingTab.image}
                      width={32}
                      height={32}
                      alt="image"
                      {...(key === activeTab && {
                        style: {
                          filter:
                            "invert(22%) sepia(53%) saturate(5680%) hue-rotate(332deg) brightness(84%) contrast(93%)"
                        }
                      })}
                    />
                    <span>{listingTab.label}</span>
                    {key === activeTab && (
                      <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-xl h-2"></div>
                    )}
                  </a>
                ))}
              </Slider>
            </div>
            <div className="tab-content mt-4">
              {map(
                get(listingsData, "body.tabContent"),
                (tabContentItem, key) =>
                  key === activeTab && (
                    <div
                      key={key}
                      className={`tab-content-item ${
                        key === activeTab
                          ? "grid grid-cols-1 lg:grid-cols-4 lg:gap-x-5"
                          : "hidden"
                      }`}>
                      {map(get(tabContentItem, "listings"), (listing, key) => (
                        <Link href="/" key={key}>
                          <div
                            className="shadow-[0px_1px_20px_0px_#00000014] rounded-xl mb-5 lg:mb-0"
                            key={key}>
                            <div className="relative">
                              <div className="absolute left-2 top-2 grid grid-cols-1 gap-y-2 z-10">
                                {map(listing.badges, (badge, key) => (
                                  <Badge
                                    key={key}
                                    color={get(badge, "color")}
                                    className={`bg-white text-lg font-mi-sans-semi-bold p-4 rounded-lg`}>
                                    {get(badge, "label")}
                                  </Badge>
                                ))}
                              </div>
                              <div className="w-10 h-10 absolute right-2 top-2 z-10">
                                <Image
                                  src="https://svgshare.com/i/vEH.svg"
                                  alt="add favorite"
                                  fill={true}
                                  onClick={(e) => e.preventDefault()}
                                />
                              </div>
                              <div className="w-full h-60">
                                <Slider
                                  sliderIdentifier="listing-details-image"
                                  slidesPerView={1}
                                  spaceBetween={0}
                                  sliderContainerClassName="h-full w-full"
                                  sliderWrapperClassName="h-full w-full"
                                  customPagination={customPagination}
                                  withPagination={true}>
                                  {map(get(listing, "images"), (image, key) => (
                                    <Image
                                      key={key}
                                      src={image.src || ""}
                                      alt="listing"
                                      fill={true}
                                      className="rounded-t-xl object-cover"
                                    />
                                  ))}
                                </Slider>
                              </div>
                            </div>

                            <div className="px-3 py-6">
                              <div className="mb-5">
                                <div className="text-2xl text-gray-900 font-mi-sans-semi-bold mb-2 h-16 line-clamp-2">
                                  {listing.title}
                                </div>
                                <div className="listing-item-content-location text-gray-500 text-sm h-7">
                                  {listing.location}
                                </div>
                              </div>
                              <div className="listing-item-content-benefits flex justify-between mb-4 h-7">
                                {map(listing.benefits, (benefit, key) => (
                                  <span
                                    className="text-gray-500 font-mi-sans-semi-bold"
                                    key={key}>
                                    {benefit}
                                  </span>
                                ))}
                              </div>
                              <div className="flex justify-between items-center h-16">
                                <div className="listing-item-content-price flex items-end">
                                  <span className="text-primary text-28 font-mi-sans-semi-bold">
                                    {listing.price.amount}
                                  </span>
                                  <span className="text-sm text-gray-500 ml-2">
                                    /{listing.price.type}
                                  </span>
                                </div>
                                <div className="text-primary listing-item-content-availability rounded bg-primary-100 p-2 text-center">
                                  <div className="text-xs">
                                    {listing.availability.title}
                                  </div>
                                  <div className="text-22">
                                    {listing.availability.date}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )
              )}
            </div>
          </div>
        </Section>
      )}
    </>
  );
};

export default ListingDetails;
