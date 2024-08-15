import { AdvancedMarker } from "@vis.gl/react-google-maps";

interface StationMarkerComponentProps {
    children?: React.ReactNode;
    station: Station;
    onClick?: () => void;
}

export const StationMarkerComponent: React.FC<StationMarkerComponentProps> = ({ children, station, onClick }) => {
    const { latitude, longitude } = station.location;
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const position: google.maps.LatLngLiteral = { lat , lng };
    
    return (
        <AdvancedMarker
            title={station.station_descriptive_name}
            position={position}
            onClick={onClick}
        >
            {children}
        </AdvancedMarker>
    );
};

interface TrainMarkerComponentProps {
    train: Eta;
}

export const TrainMarkerComponent: React.FC<TrainMarkerComponentProps> = ({ train }) => {
    const { lat: latitude, lon: longitude } = train;
    
    if (!latitude || !longitude) {
        return null;
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    const position: google.maps.LatLngLiteral = { lat, lng };

    return (
        <AdvancedMarker
            title={train.rt}
            position={position}
        >
          
           
        </AdvancedMarker>
    );
};

