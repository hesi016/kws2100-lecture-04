import { optionsFromCapabilities } from "ol/source/WMTS";
import { WMTSCapabilities } from "ol/format";
import { WMTS } from "ol/source";
import TileLayer from "ol/layer/Tile";

const parser = new WMTSCapabilities();

const kartverketTopoLayer = new TileLayer();
fetch("https://cache.kartverket.no/v1/wmts/1.0.0/WMTSCapabilities.xml").then(
  async function (response) {
    const result = parser.read(await response.text());
    const options = optionsFromCapabilities(result, {
      layer: "toporaster",
      matrixSet: "webmercator",
    });
    kartverketTopoLayer.setSource(new WMTS(options!));
  },
);

const aerialPhoto = new TileLayer();

fetch(
  "http://opencache.statkart.no/gatekeeper/gk/gk.open_nib_utm33_wmts_v2?SERVICE=WMTS&REQUEST=GetCapabilities",
).then(async function (response) {
  const result = parser.read(await response.text());
  const options = optionsFromCapabilities(result, {
    layer: "Nibcache_UTM33_EUREF89_v2",
    matrixSet: "default028mm",
  });
  aerialPhoto.setSource(new WMTS(options!));
});
