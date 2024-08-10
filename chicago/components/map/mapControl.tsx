import MapProvider from "@/providers/map-provider";
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
                {stations.map((item: Station, index: number) => {
                    const [lng, lat] = item.coordinates.split(',').map(Number);
                    const position: google.maps.LatLngLiteral = { lat, lng };
                    return (
                        <MarkerComponent
                            key={index}
                            position={position}
                            onClick={() => onStationClick(item, index)}
                        />
                    );
                })}
            </MapComponent>
        </MapProvider>
    );
};

export { MapController };