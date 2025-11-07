import { useMap, useMapEvents } from 'react-leaflet/hooks'
import axios from 'axios'
import { Polygon } from 'react-leaflet/Polygon';
import { useEffect, useState } from 'react';

function ringCoordsHashToArray(ring) {
    return ring.map(function (latLng) {
        return [latLng.lat, latLng.lng];
    });
}

const purpleOptions = { color: 'purple' }

export const DemoComponent = () => {

    const map = useMap();

    const [shapeCoords, setShapeCoords] = useState(null);

    const triggerRequest = async (coords: any) => {
        const response = await axios.post('https://api.traveltimeapp.com/v4/distance-map', {
            departure_searches: [
                {
                    id: "isochrone-0",
                    coords: {
                        lat: coords.lat,
                        lng: coords.lng
                    },
                    travel_distance: 10000,
                    transportation: {
                        type: "driving"
                    },
                    departure_time: new Date().toISOString()
                }
            ]
        }, {
            headers: {
                'X-Application-Id': import.meta.env.VITE_APP_ID,
                'X-Api-Key': import.meta.env.VITE_APP_KEY,
            }
        });


        const shapesCoords = response.data.results[0].shapes.map(function (polygon) {
            const shell = ringCoordsHashToArray(polygon.shell);
            const holes = polygon.holes.map(ringCoordsHashToArray);
            return [shell].concat(holes);
        });

        setShapeCoords(shapesCoords);
    }

    useMapEvents({
        click: (e) => {
            triggerRequest(e.latlng)
        }
    })

    useEffect(() => {
        if (!shapeCoords) return;
        map.fitBounds(shapeCoords);
    }, [shapeCoords]);

    return shapeCoords ? <Polygon pathOptions={purpleOptions} positions={shapeCoords} /> : null;
};