/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
// 'use client'  // I commented this line out because the parent component it marked as client

//Map component Component from library
import { GoogleMap } from "@react-google-maps/api";


interface MapComponentProps {
    children?: React.ReactNode;
}


//Map's styling
export const defaultMapContainerStyle = {
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

// Map Options
export const defaultOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'roadmap',
};

const MapComponent: React.FC<MapComponentProps> = ({children}) => {
    return (
        <div className="w-full">
            <GoogleMap 
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultCenter}
                zoom={defaultZoom}
                options={defaultOptions}>
                    {children}
            </GoogleMap>
        </div>
    )
};

export { MapComponent };