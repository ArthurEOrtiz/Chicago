import { MapAPI } from "./map-api";
import { MapComponent } from "./map-component";
import { StationMarkerComponent, TrainMarkerComponent } from "./marker-components";

interface MapControllerProps {
    arrivals: CtaApiResponse | null;
    stations: Station[];
    selectedStation: Station | null;
    onStationClick: (station: Station, index: number) => void; 
}
const MapController: React.FC<MapControllerProps> = ({ stations, selectedStation, arrivals, onStationClick }) => {
    return (
        <MapAPI>
            <MapComponent>
                {stations.map((station: Station, index: number) => {
                    return (
                        <StationMarkerComponent
                            key={index}
                            station={station}
                            selectedStation={selectedStation}
                            onClick={() => onStationClick(station, index)}
                        />
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