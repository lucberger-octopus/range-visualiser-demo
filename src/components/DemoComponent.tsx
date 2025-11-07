import { useMap, useMapEvents } from 'react-leaflet/hooks'
import axios from 'axios'
import { Polygon } from 'react-leaflet/Polygon';
import { useCallback, useEffect, useState } from 'react';
import { useSelectorContext } from './selector/selector-context';
import { Marker } from 'react-leaflet/Marker';


function ringCoordsHashToArray(ring) {
    return ring.map(function (latLng) {
        return [latLng.lat, latLng.lng];
    });
}

export const DemoComponent = () => {

    const { car } = useSelectorContext();
    const map = useMap();

    const [shapeCoords, setShapeCoords] = useState(null);
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);

    const triggerRequest = useCallback(async (coords: any) => {
        setLoading(true);
        const response = await axios.post('https://api.traveltimeapp.com/v4/distance-map', {
            departure_searches: [
                {
                    id: "isochrone-0",
                    coords: {
                        lat: coords.lat,
                        lng: coords.lng
                    },
                    travel_distance: car?.range || 0,
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
        setLoading(false);
    }, [car]);

    useMapEvents({
        click: (e) => {
            setCoords(e.latlng);
            triggerRequest(e.latlng)
        }
    })

    useEffect(() => {
        if (!shapeCoords) return;
        map.fitBounds(shapeCoords);
    }, [shapeCoords]);

    useEffect(() => {
        if (!car?.range) return;
        triggerRequest(coords);
    }, [car?.range])

    return (
        <>
            {shapeCoords ? (<>
                <Polygon pathOptions={{color: '#2D008C'}} positions={shapeCoords} />
                <Marker position={[coords.lat, coords.lng]} />
                </>) : null}
        </>
    );
};