"use client";   
import { MarkerF } from "@react-google-maps/api";

interface MarkerComponentProps {
    position: google.maps.LatLngLiteral;
    icon?: string;
    onClick?: () => void;
}

const MarkerComponent: React.FC<MarkerComponentProps> = ({ position, icon, onClick }) => {
    return (
        <MarkerF 
            position={position} 
            onClick={onClick}
            clickable={true}
            icon={icon}
        />
    );
};

export { MarkerComponent };