import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";
import { MapAPI } from "./map-api";
import { MapComponent } from "./map-component";
import { StationMarkerComponent, TrainMarkerComponent } from "./marker-components";

interface MapControllerProps {
    children: React.ReactNode;
    arrivals: CtaApiResponse | null;
    stations: Station[];
    selectedStation: Station | null;
    onStationClick: (station: Station, index: number) => void; 
}
const MapController: React.FC<MapControllerProps> = ({ children, stations, selectedStation, arrivals, onStationClick }) => {
    return (
        <MapAPI>
            <MapComponent>
                <MapControl position={ControlPosition.RIGHT}>
                    {children}
                </MapControl>
                
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