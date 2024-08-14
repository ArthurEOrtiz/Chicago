import { Map } from '@vis.gl/react-google-maps';

interface MapComponentProps {
    children?: React.ReactNode;
}

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
        >
            {children}
        </Map>
    )
};

export { MapComponent };