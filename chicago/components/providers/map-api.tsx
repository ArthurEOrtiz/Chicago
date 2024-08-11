'use client';
import { APIProvider } from "@vis.gl/react-google-maps";
import { useState } from "react";

interface MapAPIProps {
    children: React.ReactNode;
}

const MapAPI: React.FC<MapAPIProps> = ({ children }) => {
    const [ isLoaded, setIsLoaded ] = useState(false);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

    return (
        <APIProvider 
            apiKey={apiKey}
            onLoad={() => setIsLoaded(true)}
            libraries={['drawing', 'geometry', 'places']}

        >
            {isLoaded ? children : (
                <div className="flex justify-center items-center h-full">
                    <span className='loading loading-spinner loading-lg'></span>
                </div>
            )}

        </APIProvider>
    );
};

export { MapAPI };