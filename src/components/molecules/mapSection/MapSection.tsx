"use client";
import { get } from "lodash";
import dynamic from "next/dynamic";
import { Circle, LayerGroup } from "react-leaflet";

import { IMapSection } from "@/components/molecules/mapSection/types";

import "leaflet/dist/leaflet.css";

const MapSection = ({ data, className = "" }: IMapSection) => {
  const Map = dynamic(() => import("../../molecules/map/Map"), {
    ssr: false
  });

  const { city, district, approx_lat, approx_lng } = data;
  const center = [approx_lat, approx_lng];

  return (
    <section className={`flex flex-col gap-y-8 ${className}`}>
      <header>
        <h1 className="text-2xl">Where You’ll Be</h1>
      </header>
      <div>
        <Map className="z-0" center={center} scrollWheelZoom={false} zoom={12}>
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
                  The full address is not shown until the reservation is made.
                </Popup>
              </Marker>
            </>
          )}
        </Map>
      </div>
      <h1 className="text-xl capitalize">{`${city}, ${district}`}</h1>
      <article className="text-lg">{get(data, "content")}</article>
    </section>
  );
};

export default MapSection;
