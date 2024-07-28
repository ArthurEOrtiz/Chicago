"use client";
import MapProvider from "@/providers/map-provider";
import { MapComponent } from "./map";

interface MapControllerProps {
    data: any;
}
const MapController: React.FC<MapControllerProps> = ({ data }) => {
    return (
        <MapProvider>
            <MapComponent>
                {data.map((item: any, index: number) => {
                    return (
                        <MarkerComponent
                            key={index}
                            position={{ lat: item.lat, lng: item.lng }}
                            title={item.title}
                        >
                            <InfoWindowComponent
                                title={item.title}
                                position={{ lat: item.lat, lng: item.lng }}
                            />
                        </MarkerComponent>
                    );
                })}
            </MapComponent>
        </MapProvider>
    );
};