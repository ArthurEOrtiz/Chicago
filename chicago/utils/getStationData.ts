export const getStationData = async () => {
    const response = await fetch('https://data.cityofchicago.org/resource/8pix-ypme.json');
    if (!response.ok) {
        throw new Error('Failed to fetch station data');
    }
    return response.json();
}