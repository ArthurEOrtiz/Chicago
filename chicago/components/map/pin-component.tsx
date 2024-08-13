import { Pin } from "@vis.gl/react-google-maps";

interface PinComponentProps {
    station: Station;
}

const PinComponent: React.FC<PinComponentProps> = ({ station }) => {

    const stationToColor = (station: Station) => {
        const colors = new Set<string>();

        station.stops.forEach(stop => {
            if (stop.red) colors.add('red');
            if (stop.blue) colors.add('blue');
            if (stop.g) colors.add('green');
            if (stop.brn) colors.add('brown');
            if (stop.p) colors.add('purple');
            if (stop.pexp) colors.add('purple express');
            if (stop.y) colors.add('yellow');
            if (stop.pnk) colors.add('pink');
            if (stop.o) colors.add('orange');
        });

        if (colors.size > 2) {
            return {
                background: 'gray',
                borderColor: 'black',
                glyphColor: 'white'
            };
        }

        const color = colors.values().next().value;
        switch (color) {
            case 'red':
                return {
                    background: '#c60c30',
                    borderColor: '#b20000',
                    glyphColor: '#ff6666'
                };
            case 'blue':
                return {
                    background: '#00a1de',
                    borderColor: '#0017DE',
                    glyphColor: '#005DDE'
                };
            case 'green':
                return {
                    background: '#009b3a',
                    borderColor: '#00b200',
                    glyphColor: '#66ff66'
                };
            case 'brown':
                return {
                    background: '#8b4513',
                    borderColor: '#5a2e0d',
                    glyphColor: '#a0522d'
                };
            case 'purple':
            case 'purple express':
                return {
                    background: '#800080',
                    borderColor: '#4b004b',
                    glyphColor: '#b266b2'
                };
            case 'yellow':
                return {
                    background: '#ffff00',
                    borderColor: '#b2b200',
                    glyphColor: '#ffff66'
                };
            case 'pink':
                return {
                    background: '#ff69b4',
                    borderColor: '#b2447d',
                    glyphColor: '#ff85c1'
                };
            case 'orange':
                return {
                    background: '#f9461c',
                    borderColor: '#b27300',
                    glyphColor: '#ffb84d'
                };
            default:
                return {
                    background: '#808080',
                    borderColor: '#4d4d4d',
                    glyphColor: '#b3b3b3'
                };
        }
    };

    const colors = stationToColor(station);

    return (
        <Pin
            background={colors.background}
            borderColor={colors.borderColor}
            glyphColor={colors.glyphColor}
        />
    );  
}


export { PinComponent };