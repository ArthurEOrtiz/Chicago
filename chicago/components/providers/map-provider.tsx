'use client';
import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';

const libraries = ['places', 'drawing', 'geometry'];

interface MapProviderProps {
  children: ReactNode;
}

const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as Libraries,
  });

  if (loadError) return <p>Encountered error while loading google maps</p>;

  if (!isLoaded) return (
    <div className="flex justify-center items-center h-full">
        <span className='loading loading-spinner loading-lg'></span>
    </div>
  );

  return <>{children}</>;
};

export default MapProvider;