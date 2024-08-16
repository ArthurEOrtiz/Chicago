export const getStationData = async () => {
    const response = await fetch('/api/stations');
    if (!response.ok) {
        throw new Error('Failed to fetch station data');
    }
    return response.json();
}