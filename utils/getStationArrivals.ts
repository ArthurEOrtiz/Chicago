export const getStationArrivals = async (mapId: string) => {
    const response = await fetch(`/api/stationArrivals?mapId=${mapId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch station data');
    }

    return response.json();
}