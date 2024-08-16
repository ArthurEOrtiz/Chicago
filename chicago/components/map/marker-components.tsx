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
            zIndex={1}
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

    const trainColor = () => {
        if (train.rt === 'Red') return 'border-cta-red';
        if (train.rt === 'Blue') return 'border-cta-blue';
        if (train.rt === 'G') return 'border-cta-green';
        if (train.rt === 'Brn') return 'border-cta-brown';
        if (train.rt === 'P') return 'border-cta-purple';
        if (train.rt === 'Pexp') return 'border-cta-purple-express';
        if (train.rt === 'Y') return 'border-cta-yellow';
        if (train.rt === 'Pink') return 'border-cta-pink';
        if (train.rt === 'Org') return 'border-cta-orange';

    };

    return (
        <AdvancedMarker
            title={train.rt}
            position={position}
            
        >
            <div className={`border-2 ${trainColor()} p-1 rounded-lg mb-1`}>
                <p>{train.destNm}</p>
                <p>Route: {train.rn}</p>
            </div>
     
           
        </AdvancedMarker>
    );
};

