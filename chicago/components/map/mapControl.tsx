import { MapAPI } from "../providers/map-api";
import { MapComponent } from "./map-component";
import { MarkerComponent } from "./marker";

interface MapControllerProps {
    stations: Station[];
    onStationClick: (station: Station, index: number) => void; 
}
const MapController: React.FC<MapControllerProps> = ({ stations, onStationClick }) => {
    return (
        <MapAPI>
            <MapComponent>
                {stations.map((station: Station, index: number) => {
                    const { latitude, longitude } = station.location;
                    const lat = parseFloat(latitude);
                    const lng = parseFloat(longitude);
                    const position: google.maps.LatLngLiteral = { lat , lng };
                    return (
                        <MarkerComponent
                            key={index}
                            position={position}
                            onClick={() => onStationClick(station, index)}
                        />
                    );
                })}
            </MapComponent>
        </MapAPI>
    );
};

export { MapController };