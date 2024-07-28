import { MapComponent } from '@/components/map';
import MapProvider from '@/providers/map-provider';
import React from 'react';


const Home: React.FC = () => {
    return (
      <MapProvider>
        <MapComponent />
      </MapProvider>
    )
 
  
};

export default Home;