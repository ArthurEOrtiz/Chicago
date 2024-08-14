import React, { useEffect, useState } from 'react';
import { Map, useMap } from '@vis.gl/react-google-maps';
import { parseKML } from '@/utils/parseKML'; // Adjust the import path as needded

interface MapComponentProps {
    children?: React.ReactNode;
}

const MapComponent: React.FC<MapComponentProps> = ({children}) => {
  const map = useMap();
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string;
  const [polylines, setPolylines] = useState<google.maps.Polyline[]>([]);

  useEffect(() => {
    async function loadKML() {
      try {
        const polylineData = await parseKML('/data/doc.kml'); // Adjust the path as needed
        if (map) {
          const newPolylines = polylineData.map(({ coordinates, color }) => {
            const polyline = new google.maps.Polyline({
              path: coordinates,
              strokeColor: `#${color.slice(6)}${color.slice(4, 6)}${color.slice(2, 4)}${color.slice(0, 2)}`, // Convert KML color to hex
              strokeWeight: 2,
            });
            polyline.setMap(map);
            return polyline;
          });
          setPolylines(newPolylines);
        }
      } catch (error) {
        console.error('Error loading KML:', error); // Add this line to log errors
      }
    }

    loadKML();

    return () => {
      polylines.forEach((polyline) => polyline.setMap(null));
    };
  }, [map]);

  return (
    <Map 
      mapId={mapId}
      defaultCenter={{ lat: 41.8781, lng: -87.6298 }}
      defaultZoom={10.5}
    >
        {children}
    </Map>
  );
};

export { MapComponent };