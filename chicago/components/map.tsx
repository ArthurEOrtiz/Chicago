/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
'use client'

//Map component Component from library
import { GoogleMap } from "@react-google-maps/api";

//Map's styling
export const defaultMapContainerStyle = {
    width: '100%',
    height: '80vh',
    borderRadius: '15px 15px 15px 15px',
};

// Map Center 
export const defaultCenter = {
    lat: 41.8781,
    lng: -87.6298,
};

// Map Zoom
export const defaultZoom = 10;

// Map Options
export const defaultOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'roadmap',
};

const MapComponent: React.FC = () => {
    return (
        <div className="w-full">
            <GoogleMap 
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultCenter}
                zoom={defaultZoom}
                options={defaultOptions}>
            </GoogleMap>
        </div>
    )
};

export { MapComponent };