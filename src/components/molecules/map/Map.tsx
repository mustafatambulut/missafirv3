"use client";
import { useEffect } from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";

import { IMap } from "@/components/molecules/map/types";

import "./Map.css";
import "leaflet/dist/leaflet.css";

const Map = ({
  children,
  className,
  width = 400,
  height = 400,
  ...rest
}: IMap) => {
  const init = async () => {
    Leaflet.Icon.Default.mergeOptions({
      iconRetinaUrl: "/images/home_location.svg",
      iconSize: [44, 45],
      iconAnchor: [22, 22],
      shadowUrl: ""
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="h-full">
      <ReactLeaflet.MapContainer
        width={width}
        height={height}
        className={`w-full h-80 z-0 ${className}`}
        {...rest}>
        {children(ReactLeaflet, Leaflet)}
      </ReactLeaflet.MapContainer>
    </div>
  );
};

export default Map;
