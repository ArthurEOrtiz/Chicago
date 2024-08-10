"use client";
import { InfoWindowF } from "@react-google-maps/api";

interface InfoWindowComponentProps {
    title: string;
    position: google.maps.LatLngLiteral;
}

const InfoWindowComponent: React.FC<InfoWindowComponentProps> = ({ title, position }) => {
    return (
        <InfoWindowF
            position={position}
            zIndex={1}
            options={{ pixelOffset: new google.maps.Size(0, 0) }}
        >
            <h2 className="font-bold text-black">{title}</h2>
        </InfoWindowF>
    );
};

export { InfoWindowComponent };