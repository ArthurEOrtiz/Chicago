'use client';   
import React, { useState, useRef, useEffect } from 'react';
import { MapController } from '@/components/map/map-controller';
import { getStationArrivals } from '@/utils/getStationArrivals';
import ErrorModal from '../modals/error';
import { getStationData } from '@/utils/getStationData';
import { ArrivalsList } from './arrivals-list';
import { StationList } from './station-list';

const InteractiveMapContainer: React.FC = () => {
    const [stations, setStations] = useState<Station[]>([]);
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);
    const [arrivals, setArrivals] = useState<CtaApiResponse | null>(null);
    const [loadingArrivals, setLoadingArrivals] = useState<boolean>(false);
    const [loadingStations, setLoadingStations] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const stationRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        getStationData()
            .then(data => {
                setStations(data);
            })
            .catch(error => setError(error))
            .finally(() => setLoadingStations(false));
    }, []);

    useEffect(() => {
        if (!selectedStation) return;
        const mapId = selectedStation.map_id;
        setLoadingArrivals(true);
        getStationArrivals(mapId)
            .then(data => {
                if (data.ctatt.errCd !== '0') {
                    setError(data.ctatt.errNm);
                    setArrivals(null);
                    return;
                }
                setArrivals(data);
            })
            .catch(error => setError(error))
            .finally(() => setLoadingArrivals(false));
    }, [selectedStation]);

    const handleStationClick = (station: Station, index: number) => {
        setSelectedStation(station);
        const stationElement = stationRefs.current[index];
        const containerElement = containerRef.current;
    
        if (stationElement && containerElement) {
            const stationRect = stationElement.getBoundingClientRect();
            const containerRect = containerElement.getBoundingClientRect();
    
            const stationCenter = stationRect.top + (stationRect.height / 2);
            const containerCenter = containerRect.top + (containerRect.height / 2);
    
            const scrollOffset = stationCenter - containerCenter;
    
            containerElement.scrollTo({ top: containerElement.scrollTop + scrollOffset, behavior: 'smooth' });
        }
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedColor(event.target.value);
    };

    const filteredStations = selectedColor
        ? stations.filter(station => station.colors.includes(selectedColor))
        : stations;

    return (
        <div className='space-y-2'>
            {/* Main container */}  
            <div className="flex flex-col md:flex-row space-x-2">
                <div className="md:w-2/3">
                    <MapController 
                        arrivals={arrivals}
                        stations={filteredStations} 
                        onStationClick={handleStationClick}
                    />
                </div>
                <div className="md:w-1/3 p-4 rounded-xl bg-primary space-y-2">
                    <h2 className="text-4xl font-bold">Stations</h2>
                    <div>
                        <select onChange={handleColorChange} className="select select-secondary w-full select-bordered bg-transparent">
                            <option value="" className='text-black'>All Lines</option>
                            <option value="red" className='text-black'>Red</option>
                            <option value="blue" className='text-black'>Blue</option>
                            <option value="g" className='text-black'>Green</option>
                            <option value="brn" className='text-black'>Brown</option>
                            <option value="pexp" className='text-black'>Purple</option>
                            <option value="y" className='text-black'>Yellow</option>
                            <option value="pnk" className='text-black'>Pink</option>
                            <option value="o" className='text-black'>Orange</option>
                        </select>
                    </div>
                    {loadingStations && 
                        <div className="flex justify-center items-center h-full ">
                            <span className='loading loading-spinner loading-lg'></span>
                        </div>
                    }
                    <div ref={containerRef} className="h-[42vh] overflow-y-auto">
                        {filteredStations && (
                            <StationList 
                                stations={filteredStations} 
                                selectedStation={selectedStation} 
                                ref={(el: HTMLDivElement | null) => {
                                    if (el) {
                                        stationRefs.current.push(el);
                                    }
                                }}
                                onStationClick={handleStationClick}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="bg-secondary rounded-xl p-2 space-y-2  ">
                <div>
                    {/* Arrivals header */}
                    <h2 className="text-4xl font-bold ml-2">Arrivals</h2>
                </div>
                <div>
                    {/* Arrivals main */}
                    <div className='h-[35vh] space-y-2 overflow-y-auto'>
                        {/* Arrivals list */}
                        <ArrivalsList loadingArrivals={loadingArrivals} arrivals={arrivals} />
                    </div>
                </div>
            </div>
            {error && (
                <ErrorModal
                    title="Error"
                    message={error} 
                    onClose={() => setError(null)}
                />
            )}
        </div>
    );
};

export default InteractiveMapContainer;