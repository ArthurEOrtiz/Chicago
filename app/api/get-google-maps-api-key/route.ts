import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key not found' }, { status: 500 });
    }

    //console.log('API key:', apiKey);
    return NextResponse.json({ apiKey }, { status: 200 });
}