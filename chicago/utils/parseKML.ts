import { parseStringPromise } from 'xml2js';

interface Coordinate {
    lat: number;
    lng: number;
}

interface PolylineData {
    coordinates: Coordinate[];
    color: string;
}

async function parseKML(url: string): Promise<PolylineData[]> {
    const response = await fetch(url);
    const kmlData = await response.text();
    const result = await parseStringPromise(kmlData);
    //console.log('Parsed KML Result:', JSON.stringify(result, null, 2));

    const polylines: PolylineData[] = [];
    const document = result?.kml?.Document?.[0];
    if (!document) {
        throw new Error('Invalid KML structure: Document not found');
    }

    // Create a map of style IDs to colors
    const styleMap: { [key: string]: string } = {};
    const styles = document.Style;
    if (styles) {
        styles.forEach((style: any) => {
            const styleId = style.$.id;
            const lineStyle = style.LineStyle?.[0];
            const color = lineStyle?.color?.[0];
            if (styleId && color) {
            styleMap[`#${styleId}`] = color;
            }
        });
    }

    console.log('Style Map:', styleMap);

    // Log the entire document structure to find the correct path to Placemark
    // console.log('Document structure:', JSON.stringify(document, null, 2));

    const folder = document.Folder?.[0];
    if (!folder) {
        throw new Error('Invalid KML structure: Folder not found');
    }

    const placemarks = folder.Placemark;
    if (!placemarks) {
        throw new Error('Invalid KML structure: Placemarks not found');
    }

    placemarks.forEach((placemark: any) => {
        const coords = placemark?.MultiGeometry?.[0]?.LineString?.[0]?.coordinates?.[0]?.trim().split(' ');
        if (!coords) {
            throw new Error('Invalid KML structure: Coordinates not found');
        }

        const coordinates: Coordinate[] = coords.map((coord: string) => {
            const [lng, lat] = coord.split(',').map(Number);
            return { lat, lng };
        });

        const styleUrl = placemark?.styleUrl?.[0];
        const color = styleMap[styleUrl] || '#FFFFFF'; // Default to black if no style found

        polylines.push({ coordinates, color });
    });

    return polylines;
}

export { parseKML };