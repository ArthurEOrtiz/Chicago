import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const response = await fetch(`https://data.cityofchicago.org/resource/8pix-ypme.json?`);
    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch station data' }, { status: response.status });
    }

    const stops = await response.json();

    // Group stops by their parent station
    const stations = stops.reduce((acc: any, stop: any) => {
        const mapId = stop.map_id;
        if (!acc[mapId]) {
            acc[mapId] = {
                station_name: stop.station_name,
                station_descriptive_name: stop.station_descriptive_name,
                map_id: stop.map_id,
                location: stop.location,
                stops: []
            };
        }
        acc[mapId].stops.push(stop);
        return acc;
    }, {});

    return NextResponse.json(Object.values(stations));
}