import React, { forwardRef } from 'react';

interface StationListProps {
    stations: Station[];
    selectedStation: Station | null; 
    onStationClick: (station: Station, index: number) => void;
}

const StationList = forwardRef<HTMLDivElement, StationListProps>(({ stations, selectedStation, onStationClick }, ref) => {
    return (
        <>
            {stations.map((station, index) => (
                <div
                    key={index}
                    ref={ref}
                    className={`flex items-center space-x-2 p-2 cursor-pointer ${selectedStation?.map_id === station.map_id ? 'bg-secondary rounded-xl' : ''}`}
                    onClick={() => onStationClick(station, index)}
                >
                    <h2 className="text-xl font-bold">{station.station_name}</h2>
                </div>
            ))}
       </>
    );
});

export { StationList };