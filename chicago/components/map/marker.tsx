import { AdvancedMarker } from "@vis.gl/react-google-maps";

interface MarkerComponentProps {
    children?: React.ReactNode;
    position: google.maps.LatLngLiteral;
    onClick?: () => void;
}

const MarkerComponent: React.FC<MarkerComponentProps> = ({ children, position, onClick }) => {
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