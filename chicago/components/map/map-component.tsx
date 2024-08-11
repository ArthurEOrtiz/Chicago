import { Map } from '@vis.gl/react-google-maps';

interface MapComponentProps {
    children?: React.ReactNode;
}

//Map's styling
export const style: React.CSSProperties = {
    width: '100%',
    height: '50vh',
    borderRadius: '15px 15px 15px 15px',
};

// Map Center 
export const defaultCenter = {
    lat: 41.8781,
    lng: -87.6298,
};

// Map Zoom
export const defaultZoom = 10.5;

const MapComponent: React.FC<MapComponentProps> = ({children}) => {
    const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string;

    return (
      
            <Map 
                mapId={mapId}
                defaultCenter={defaultCenter}
                defaultZoom={defaultZoom}
                tilt={0}
            >
                    {children}
            </Map>
  
    )
};

export { MapComponent };