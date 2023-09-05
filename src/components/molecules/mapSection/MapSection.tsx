"use client";
import dynamic from "next/dynamic";
import { capitalize, get } from "lodash";
import { Circle, LayerGroup } from "react-leaflet";

import { IMapSection } from "@/components/molecules/mapSection/types";

import "leaflet/dist/leaflet.css";

const MapSection = ({ data, className = "" }: IMapSection) => {
  if (!get(data, "approx_lat") && !get(data, "approx_lng")) return;

  const Map = dynamic(() => import("../../molecules/map/Map"), {
    ssr: false
  });

  const center = [get(data, "approx_lat"), get(data, "approx_lng")];

  return (
    <section className={`flex flex-col gap-y-4 lg:gap-y-8 ${className}`}>
      <header>
        <h1 className="text-xl lg:text-2xl">Where You’ll Be</h1>
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
                  The full address is not shown until the reservation is made.
                </Popup>
              </Marker>
            </>
          )}
        </Map>
      </div>
      <h1 className="text-xl">{`${capitalize(get(data, "city"))}, ${capitalize(
        get(data, "district")
      )}`}</h1>
      <article className="text-sm lg:text-lg text-gray-600">
        {get(data, "content")}
      </article>
      <hr className="lg:hidden" />
    </section>
  );
};

export default MapSection;
