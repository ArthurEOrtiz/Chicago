"use client";
import MapProvider from "@/providers/map-provider";
import { MapComponent } from "./map";
import { InfoWindowComponent } from "./infoWindo";

interface MapControllerProps {
    stations: Station[];
}
const MapController: React.FC<MapControllerProps> = ({ stations }) => {
    return (
        <MapProvider>
            <MapComponent>
                {stations.map((item: Station, index: number) => {
                    const [lng, lat] = item.coordinates.split(',').map(Number);
                    const position: google.maps.LatLngLiteral = { lat, lng };
                    return (
                        <InfoWindowComponent
                            key={index}
                            title={item.LONGNAME}
                            position={position}
                        />
                    );
                })}
            </MapComponent>
        </MapProvider>
    );
};

export { MapController };