import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";

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
    const storedPosition = JSON.parse(localStorage.getItem("position") || "[]"),
        [position, setPosition] = useState<[number, number] | null>(storedPosition.length ? storedPosition : null); // Initial state is null

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setPosition([latitude, longitude]);
            },
            (error) => {
                console.error("Error fetching location:", error);
                setPosition([51.505, -0.09]);
            }
        );
    }, []);

    if (!position) {
        return <div>Loading Map...</div>;
    }

    return (
        <MapContainer
            center={position}
            zoom={13}
            className="h-80 rounded-2xl md:col-span-2"
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
            <LocationMarker setPosition={setPosition} />
        </MapContainer>
    );
}
