import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const mapId = searchParams.get('mapId');
    const apiKey = process.env.CTA_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key not found' }, { status: 500 });
    }

    const response = await fetch(`http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${apiKey}&outputType=JSON&mapid=${mapId}`);
    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch station data' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
}