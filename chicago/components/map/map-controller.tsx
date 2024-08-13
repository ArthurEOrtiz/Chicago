import { MapAPI } from "./map-api";
import { MapComponent } from "./map-component";
import { MarkerComponent } from "./marker-component";
import { PinComponent } from "./pin-component";

interface MapControllerProps {
    stations: Station[];
    onStationClick: (station: Station, index: number) => void; 
}
const MapController: React.FC<MapControllerProps> = ({ stations, onStationClick }) => {
    return (
        <MapAPI>
            <MapComponent>
                {stations.map((station: Station, index: number) => {
                    return (
                        <MarkerComponent
                            key={index}
                            station={station}
                            onClick={() => onStationClick(station, index)}
                        >
                            <PinComponent station={station} />
                        </MarkerComponent>  
                    );
                })}
            </MapComponent>
        </MapAPI>
    );
};

export { MapController };