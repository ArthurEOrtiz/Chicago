export const getStationData = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/stations`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch station data');
    }
    return response.json();
}