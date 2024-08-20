import { AdvancedMarker, CollisionBehavior } from "@vis.gl/react-google-maps";

interface StationMarkerComponentProps {
    selectedStation: Station | null;
    station: Station;
    onClick?: () => void;
}

export const StationMarkerComponent: React.FC<StationMarkerComponentProps> = ({selectedStation, station, onClick }) => {
    const { latitude, longitude } = station.location;
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const position: google.maps.LatLngLiteral = { lat , lng };

    const stationToColor = (station: Station) => {
        const colors = new Set<string>();

        station.stops.forEach(stop => {
            if (stop.red) colors.add('red');
            if (stop.blue) colors.add('blue');
            if (stop.g) colors.add('green');
            if (stop.brn) colors.add('brown');
            if (stop.p) colors.add('purple');
            if (stop.pexp) colors.add('purple express');
            if (stop.y) colors.add('yellow');
            if (stop.pnk) colors.add('pink');
            if (stop.o) colors.add('orange');
        });

        if (colors.size > 1) {
            if (colors.has('purple') && colors.has('purple express') && colors.size === 2) {
                return "bg-cta-purple";
            } else {
                return "bg-white"
            }
        }

        const color = colors.values().next().value;
        switch (color) {
            case 'red':
                return "bg-cta-red";
            case 'blue':
                return "bg-cta-blue";
            case 'green':
                return "bg-cta-green";
            case 'brown':
                return "bg-cta-brown";
            case 'yellow':
                return "bg-cta-yellow";
            case 'pink':
                return "bg-cta-pink";
            case 'orange':
                return "bg-cta-orange";
            default:
                return "bg-white";
        }
    };
    
    return (
        <AdvancedMarker
            title={station.station_descriptive_name}
            position={position}
            onClick={onClick}
            // collisionBehavior={CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL}
            zIndex={1}
        >
            <div className="flex items-center justify-center">
                <div className={` rounded-full ${stationToColor(station)}  ${selectedStation && selectedStation.map_id === station.map_id ? 'border-2 border-white w-6 h-6': 'w-3 h-3'}`}></div>
            </div>
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

    const borderColor = () => {
        switch (train.rt) {
            case 'Red':
                return 'border-cta-red';
            case 'Blue':
                return 'border-cta-blue';
            case 'G':
                return 'border-cta-green';
            case 'Brn':
                return 'border-cta-brown';
            case 'P':
                return 'border-cta-purple';
            case 'Pexp':
                return 'border-cta-purple';
            case 'Y':
                return 'border-cta-yellow';
            case 'Pink':
                return 'border-cta-pink';
            case 'Org':
                return 'border-cta-orange';
            default:
                return '';
        }
    };

    return (
        <AdvancedMarker
            title={train.rt}
            position={position}
            collisionBehavior={CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY}
        >
            <div className={`border-2 ${borderColor()} p-1 rounded-lg`}>
                <p>{train.destNm}</p>
                <p>Route: {train.rn}</p>
            </div>
     
           
        </AdvancedMarker>
    );
};

