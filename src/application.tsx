import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM, StadiaMaps } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import { Layer } from "ol/layer";

useGeographic();

const osmLayer = new TileLayer({ source: new OSM() });
const stadiaLayer = new TileLayer({
  source: new StadiaMaps({ layer: "alidade_smooth_dark" }),
});

const map = new Map({
  view: new View({ center: [10.8, 59.9], zoom: 13 }),
  layers: [osmLayer],
});

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const [baseLayer, setBaseLayer] = useState<Layer>(osmLayer);
  useEffect(() => map.setLayers([baseLayer]), [baseLayer]);

  useEffect(() => {
    map.setTarget(mapRef.current!);
  }, []);

  const handleLayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBaseLayer(event.target.value === "osm" ? osmLayer : stadiaLayer);
  };

  return (
    <div>
      <select onChange={handleLayerChange}>
        <option value="osm"> OSM</option>
        <option value="stadia"> Stadia Maps</option>
      </select>
      <div ref={mapRef}></div>;
    </div>
  );
}
