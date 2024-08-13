import { AdvancedMarker } from "@vis.gl/react-google-maps";

interface MarkerComponentProps {
    children?: React.ReactNode;
    station: Station;
    onClick?: () => void;
}

const MarkerComponent: React.FC<MarkerComponentProps> = ({ children, station, onClick }) => {
    const { latitude, longitude } = station.location;
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const position: google.maps.LatLngLiteral = { lat , lng };
    
    return (
        <AdvancedMarker
            position={position}
            onClick={onClick}
        >
            {children}
        </AdvancedMarker>
    );
};

export { MarkerComponent };