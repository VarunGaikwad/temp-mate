import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { useContext, useEffect, useState } from "react";
import Context from "../data/GlobalModel";

// Define a custom marker icon
const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

type TLocationMarker = {
    setPosition: (position: [number, number]) => void;
};

// Component to handle map click events
function LocationMarker({ setPosition }: TLocationMarker) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
        },
    });

    return null;
}

export default function Map() {
    const { weatherInfo, setCoordinates } = useContext(Context),
        position: [number, number] = [weatherInfo.latitude, weatherInfo.longitude];

    if (!position) {
        return <div>Loading Map...</div>;
    }

    return (
        <MapContainer
            center={position}
            zoom={9}
            className="rounded-3xl md:col-span-2 h-custom"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={customIcon}>
                <Popup>
                    Selected location: <br /> Latitude: {position[0]}, Longitude: {position[1]}
                </Popup>
            </Marker>
            <LocationMarker setPosition={setCoordinates} />
        </MapContainer>
    );
}
