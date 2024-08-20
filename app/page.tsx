import React from 'react';
import InteractiveMapContainer from '@/components/map/interactive-map-container';
import { getStationData } from '@/utils/getStationData';

const Home: React.FC = async () => {
  
  const stations = await getStationData();
  
  return (
    <InteractiveMapContainer stations={stations} />
  );
};

export default Home;