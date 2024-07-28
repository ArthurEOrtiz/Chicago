"use client";   
import { MarkerF } from "@react-google-maps/api";

interface MarkerComponentProps {
    position: google.maps.LatLngLiteral;
    title?: string;
}

const MarkerComponent: React.FC<MarkerComponentProps> = ({ position, title }) => {
    return (
        <MarkerF 
            position={position} 
            title={title}
        />
    );
};

export { MarkerComponent };