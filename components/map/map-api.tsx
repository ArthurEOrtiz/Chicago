'use client';
import { APIProvider } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";

interface MapAPIProps {
    children: React.ReactNode;
}

const MapAPI: React.FC<MapAPIProps> = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [apiKey, setApiKey] = useState<string | null>(null);

    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const response = await fetch('/api/get-google-maps-api-key');
                const data = await response.json();
                setApiKey(data.apiKey);
            } catch (error) {
                console.error('Error fetching API key:', error);
            }
        };

        fetchApiKey();
    }, []);

    if (!apiKey) {
        return (
            <div className="flex justify-center items-center">
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );
    }

    return (
        <APIProvider 
            apiKey={apiKey}
            onLoad={() => setIsLoaded(true)}
            libraries={['drawing', 'geometry', 'places']}
        >
            {isLoaded ? children : (
                <div className="flex justify-center items-center">
                    <span className='loading loading-spinner loading-lg'></span>
                </div>
            )}
        </APIProvider>
    );
};

export { MapAPI };