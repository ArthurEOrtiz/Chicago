import { MapComponent } from '@/components/map/map';
import { MarkerComponent } from '@/components/map/marker';
import MapProvider from '@/providers/map-provider';
import { Stop } from '@/types/stop';
import { getStationData } from '@/utils/getStationData';
import React from 'react';

const Home: React.FC = async () => {
  const stationData : Stop[] = await getStationData();

  return (
    <div className="flex flex-col md:flex-row space-x-2">
      <div className="md:w-2/3 h-screen">
        <MapProvider>
          <MapComponent>
            {stationData.map((station: any, index: number) => (
              <MarkerComponent
                key={index}
                position={{
                  lat: parseFloat(station.location.latitude),
                  lng: parseFloat(station.location.longitude),
                }}
                title={station.station_descriptive_name}
              />
            ))}

          </MapComponent>
        </MapProvider>
      </div>
      <div className="md:w-1/3 p-4 overflow-y-auto h-[80vh] rounded-xl bg-primary">
        {stationData.map((station: any, index: number) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-bold">{station.station_descriptive_name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;