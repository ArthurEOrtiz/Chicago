import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const url = req.nextUrl;
    const mapId = url.searchParams.get('mapId');
    const apiKey = process.env.NEXT_PUBLIC_CTA_API_KEY;

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