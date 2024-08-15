import { MapAPI } from "./map-api";
import { MapComponent } from "./map-component";
import { StationMarkerComponent, TrainMarkerComponent } from "./marker-components";
import { PinComponent } from "./pin-component";

interface MapControllerProps {
    arrivals: CtaApiResponse | null;
    stations: Station[];
    onStationClick: (station: Station, index: number) => void; 
}
const MapController: React.FC<MapControllerProps> = ({ stations, arrivals, onStationClick }) => {
    return (
        <MapAPI>
            <MapComponent>
                {stations.map((station: Station, index: number) => {
                    return (
                        <StationMarkerComponent
                            key={index}
                            station={station}
                            onClick={() => onStationClick(station, index)}
                        >
                            <PinComponent station={station} />
                        </StationMarkerComponent>  
                    );
                })}
                {arrivals?.ctatt.eta.map((eta: Eta, index: number) => {
                    return (
                        <TrainMarkerComponent key={index} train={eta} />
                    );
                })}
            </MapComponent>
        </MapAPI>
    );
};

export { MapController };