'use client';   
import React, { useState, useRef, useEffect, use } from 'react';
import { MapController } from '@/components/map/mapControl';
import stations from '@/data/stations.json';
import { getStationArrivals } from '@/utils/getStationArrivals';
import Eta from '../cta/eta';
import ErrorModal from '../modals/error';

const InteractiveMapContainer: React.FC = () => {
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);
    const [ arrivals, setArrivals ] = useState<CtaApiResponse | null>(null);
    const [ loadingArrivals, setLoadingArrivals ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);
    const stationRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!selectedStation) return;
        const mapId = selectedStation.GTFS;
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
            .catch(error => console.error(error))
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
                <div ref={containerRef} className="md:w-1/3 p-4 overflow-y-auto h-[50vh]  rounded-xl bg-primary">
                    {stations.map((station: Station, index: number) => (
                        <div 
                        key={index}
                        ref={(el) => { stationRefs.current[index] = el; }}
                        onClick={() => handleStationClick(station, index)}
                        className={`p-2 cursor-pointer ${selectedStation?.STATION_ID === station.STATION_ID ? 'bg-secondary rounded-xl' : ''}`}
                        >
                            <h2 className="text-xl font-bold">{station.LONGNAME}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-secondary rounded-xl p-2 space-y-2">
                <div>
                    {/* Arrivals header */}
                    <h2 className="text-4xl font-bold ml-2">Arrivals</h2>
                </div>
                <div>
                    {/* Arrivals main */}
                    <div className='space-y-2'>
                        {/* Arrivals list */}
                        { loadingArrivals ? (
                            <div className="p-2 rounded-xl bg-gray-500 flex justify-center">
                                <span className='loading loading-spinner loading-lg'></span>
                            </div>
                        ) : arrivals ? (
                            arrivals.ctatt?.eta?.length > 0 ? (
                                arrivals.ctatt.eta.map((eta: Eta, index: number) => (
                                        <Eta key={index} eta={eta} />
                                    )
                                )
                            ) : (
                                <div className="p-2 rounded-xl bg-error-content">
                                    <p className='text-error'>No arrivals found.</p>
                                </div>
                            )
                        ) : (
                            <div className="p-2 rounded-xl bg-warning-content">
                                <p className='text-warning'>Select a station on the map or the list.</p>
                            </div>
                        )}
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