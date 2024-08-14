'use client';   
import React, { useState, useRef, useEffect } from 'react';
import { MapController } from '@/components/map/map-controller';
import { getStationArrivals } from '@/utils/getStationArrivals';
import ErrorModal from '../modals/error';
import { getStationData } from '@/utils/getStationData';
import { ArrivalsList } from './arrivals-list';
import { StationList } from './station-list';

const InteractiveMapContainer: React.FC = () => {
    const [ stations, setStations ] = useState<Station[]>([]);
    const [ selectedStation, setSelectedStation ] = useState<Station | null>(null);
    const [ arrivals, setArrivals ] = useState<CtaApiResponse | null>(null);
    const [ loadingArrivals, setLoadingArrivals ] = useState<boolean>(false);
    const [ loadingStations, setLoadingStations ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);
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
        if (!selectedStation ) return;
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
            const containerHeight = containerElement.clientHeight;
            const stationHeight = stationElement.clientHeight;
            const stationOffsetTop = stationElement.offsetTop;
            const scrollOffset = stationOffsetTop - (containerHeight / 2) + (stationHeight / 2);

            containerElement.scrollTo({ top: scrollOffset, behavior: 'smooth' });
        }
    };

    return (
        <div className='space-y-2'>
             {/* Main container */}  
            <div className="flex flex-col md:flex-row space-x-2">
                <div className="md:w-2/3">
                    <MapController stations={stations} onStationClick={handleStationClick} />
                </div>
                <div className="md:w-1/3 p-4 rounded-xl bg-primary">
                    <h2 className="text-4xl font-bold">Stations</h2>
                    {loadingStations && 
                        <div className="flex justify-center items-center h-full ">
                            <span className='loading loading-spinner loading-lg'></span>
                        </div>
                    }
                    <div ref={containerRef} className="overflow-y-auto h-[50vh]">
                        {stations && (
                            <StationList 
                                stations={stations} 
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
            <div className="bg-secondary rounded-xl p-2 space-y-2 ">
                <div>
                    {/* Arrivals header */}
                    <h2 className="text-4xl font-bold ml-2">Arrivals</h2>
                </div>
                <div>
                    {/* Arrivals main */}
                    <div className='space-y-2 h-[35vh] overflow-y-auto'>
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