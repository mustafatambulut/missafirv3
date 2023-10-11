"use client";
import { get } from "lodash";
import dynamic from "next/dynamic";
import { Circle, LayerGroup } from "react-leaflet";

import { IMapSection } from "@/components/molecules/mapSection/types";

import "leaflet/dist/leaflet.css";
import { useTranslations } from "next-intl";
import Typography from "@/components/atoms/typography/Typography";

const MapSection = ({ data, className = "" }: IMapSection) => {
  if (!get(data, "approx_lat") && !get(data, "approx_lng")) return;

  const Map = dynamic(() => import("../../molecules/map/Map"), {
    ssr: false
  });

  const center = [get(data, "approx_lat"), get(data, "approx_lng")];
  const t = useTranslations()

  return (
    <section className={`flex flex-col gap-y-4 lg:gap-y-8 ${className}`}>
      <header>
        <h1 className="text-xl lg:text-2xl">{t("where_you_will_be")}</h1>
      </header>
      <div>
        <Map
          zoom={12}
          center={center}
          scrollWheelZoom={false}
          className="z-0 rounded-xl">
          {({ TileLayer, Marker, Popup }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution=""
              />
              <LayerGroup>
                <Circle
                  center={center}
                  pathOptions={{ color: "transparent", fillColor: "red" }}
                  radius={1000}
                />
              </LayerGroup>
              <Marker position={center}>
                <Popup>
                  {t("the_full_address_is_not_shown_until_the_reservation_is_made")}
                </Popup>
              </Marker>
            </>
          )}
        </Map>
      </div>
      <Typography element="h6" variant="h6">{`${get(data, "city")}, ${get(
        data,
        "district"
      )}`}</Typography>
      <Typography variant="p3" element="p" className="text-gray-600 mi-sans">
        {get(data, "content")}
      </Typography>
      <hr className="lg:hidden" />
    </section>
  );
};

export default MapSection;
