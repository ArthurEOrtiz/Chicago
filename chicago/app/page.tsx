import { MapController } from '@/components/map/mapControl';
import React from 'react';
import stations from '@/data/stations.json';

const Home: React.FC = async () => {
  return (
    <div className="flex flex-col md:flex-row space-x-2">
      <div className="md:w-2/3 h-screen">
        <MapController stations={stations}/>
      </div>
      <div className="md:w-1/3 p-4 overflow-y-auto h-[80vh] rounded-xl bg-primary">
        {stations.map((station: Station, index: number) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-bold">{station.LONGNAME}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;