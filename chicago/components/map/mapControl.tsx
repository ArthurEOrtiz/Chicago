import MapProvider from "@/components/providers/map-provider";
import { MapComponent } from "./map";
import { MarkerComponent } from "./marker";

interface MapControllerProps {
    stations: Station[];
    onStationClick: (station: Station, index: number) => void; 
}
const MapController: React.FC<MapControllerProps> = ({ stations, onStationClick }) => {
    return (
        <MapProvider>
            <MapComponent
            >
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
        </MapProvider>
    );
};

export { MapController };