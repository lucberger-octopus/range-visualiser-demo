import { useMap, useMapEvents } from "react-leaflet/hooks";
import axios from "axios";
import { Polygon } from "react-leaflet/Polygon";
import { useCallback, useEffect, useState } from "react";
import { useSelectorContext } from "./selector/selector-context";
import { Marker } from "react-leaflet/Marker";
import { type LatLng, Icon, Point } from "leaflet";
import pinIcon from "../assets/sprites/pin.svg";

function ringCoordsHashToArray(ring: LatLng[]) {
  return ring.map(function (latLng) {
    return [latLng.lat, latLng.lng];
  });
}

export const DemoComponent = () => {
  const { car } = useSelectorContext();
  const map = useMap();

  const [shapeCoords, setShapeCoords] = useState<number[][][][] | null>(null);
  const [coords, setCoords] = useState<LatLng | null>(null);

  const triggerRequest = useCallback(
    async (coords: LatLng) => {
      if (!car) return;

      const response = await axios.post<{
        results: {
          shapes: {
            shell: LatLng[];
            holes: LatLng[][];
          }[];
        }[];
      }>(
        "https://api.traveltimeapp.com/v4/distance-map",
        {
          departure_searches: [
            {
              id: "isochrone-0",
              coords: {
                lat: coords.lat,
                lng: coords.lng,
              },
              travel_distance: car?.range || 0,
              transportation: {
                type: "driving",
              },
              no_holes: true,
              level_of_detail: {
                scale_type: "simple",
                level: "lowest",
              },
              departure_time: new Date().toISOString(),
            },
          ],
        },
        {
          headers: {
            "X-Application-Id": import.meta.env.VITE_APP_ID,
            "X-Api-Key": import.meta.env.VITE_APP_KEY,
          },
        }
      );
      const shapes = response.data.results[0].shapes;

      const shapesCoords = shapes.map(function (polygon) {
        const shell = ringCoordsHashToArray(polygon.shell);
        const holes = polygon.holes.map((hole) => ringCoordsHashToArray(hole));
        return [shell].concat(holes);
      });

      setShapeCoords(shapesCoords);
    },
    [car]
  );

  useMapEvents({
    click: (e) => {
      setCoords(e.latlng);
      triggerRequest(e.latlng);
    },
  });

  useEffect(() => {
    if (!shapeCoords) return;
    console.log(shapeCoords);
    map.fitBounds(shapeCoords);
  }, [map, shapeCoords]);

  useEffect(() => {
    if (!car?.range || !coords) return;
    triggerRequest(coords);
  }, [car?.range, coords, triggerRequest]);

  return (
    <>
      {shapeCoords ? (
        <>
          <Polygon pathOptions={{ color: "#7503D4" }} positions={shapeCoords} />
        </>
      ) : null}
      {coords ? (
        <>
          <Marker position={[coords.lat, coords.lng]} icon={iconPerson} />
        </>
      ) : null}
    </>
  );
};

const iconPerson = new Icon({
  iconUrl: pinIcon,
  iconRetinaUrl: pinIcon,
  iconSize: new Point(50, 50),
  iconAnchor: new Point(25, 50),
  className: "leaflet-div-icon",
});
