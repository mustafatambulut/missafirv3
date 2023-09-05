import { notFound } from "next/navigation";
import { get, includes, startCase } from "lodash";

import { decodeParams } from "@/utils/helper";
import Listings from "@/components/templates/listings/Listings";

const RentListing = ({ params }: any) => {
  const allowed = ["kiralik-villa", "kiralik-ev"];
  const path = decodeParams(get(params, "type"));

  !includes(allowed, path) && notFound();
  // todo: burada mock data yerine urldeki parametreye göre evler listelenecek
  const mockListings = [
    {
      id: "1",
      size: 120,
      code: "HMDY9WNE29",
      concept: "conservative",
      available: "09 Aug",
      location: "İstanbul, Beyoğlu",
      beds: { title: "4", value: "4", type: "beds" },
      badges: [{ color: "primary", label: "M Homes" }],
      essentials: ["4 Bedroom", "3 Bathroom", "120 m2"],
      bathrooms: { title: "3", value: "3", type: "bathrooms" },
      title: "Outstanding Flat with Calming View at Nisantasi",
      price: {
        total: { amount: "84,000₺", value: 84000, type: "total" },
        daily: {
          oldAmount: "14,238₺",
          amount: "12,000₺",
          value: 12000,
          type: "nightly"
        }
      },
      platform: { name: "Airbnb", logo: "https://svgshare.com/i/wEt.svg" },
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
      size: 300,
      code: "HMDY9WNE29",
      concept: "vip",
      available: "12 Nov",
      location: "İstanbul, Şişli",
      beds: { title: "2", value: "2", type: "beds" },
      badges: [{ color: "secondary", label: "M VIP" }],
      essentials: ["1 Bedroom", "1 Bathroom", "300 m2"],
      bathrooms: { title: "1", value: "1", type: "bathrooms" },
      title: "Cozy Flat 5 min to Bazaar and Coast in Izmir",
      price: {
        total: { amount: "132,000₺", value: 132000, type: "total" },
        daily: {
          oldAmount: "23,238₺",
          amount: "20,000₺",
          value: 20000,
          type: "nightly"
        }
      },
      platform: { name: "Airbnb", logo: "https://svgshare.com/i/wEt.svg" },
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
      id: "3",
      size: 120,
      code: "HMDY9WNE29",
      concept: "friendly",
      available: "12 Sep",
      location: "İstanbul, Beyoğlu",
      beds: { title: "4", value: "4", type: "beds" },
      badges: [{ color: "primary", label: "M Homes" }],
      essentials: ["4 Bedroom", "4 Bathroom", "210 m2"],
      bathrooms: { title: "4", value: "4", type: "bathrooms" },
      title: "Villa w/ Pool Jacuzzi 5 min to Marina in Antalya",
      price: {
        total: { amount: "66,000₺", value: 66000, type: "total" },
        daily: {
          oldAmount: "23,238₺",
          amount: "12,000₺",
          value: 12000,
          type: "nightly"
        }
      },
      platform: { name: "Airbnb", logo: "https://svgshare.com/i/wEt.svg" },
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
  ];

  return (
    <div className="h-40 mt-40 w-full">
      <h1 className="text-3xl">
        {startCase(get(params, "type"))} ve Daire Seçenekleri
      </h1>
      <Listings data={mockListings} />
    </div>
  );
};

export default RentListing;
