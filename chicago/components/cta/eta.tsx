import moment from 'moment-timezone';

interface etaProps {
    eta: Eta;
}

const Eta: React.FC<etaProps> = ({ eta }) => {

    const routeToColor = (route: string) => {

        /*
            Red = Red Line (Howard-95th/Dan Ryan service)
            Blue = Blue Line (O’Hare-Forest Park service)
            Brn = Brown Line (Kimball-Loop service)
            G = Green Line (Harlem/Lake-Ashland/63rd-Cottage Grove service)
            Org = Orange Line (Midway-Loop service)
            P = Purple Line (Linden-Howard shuttle service)
            Pink = Pink Line (54th/Cermak-Loop service)
            Y = Yellow Line (Skokie-Howard [Skokie Swift] shuttle service)
        */

        switch (route) {
            case 'Red':
                return 'bg-red-500';
            case 'Blue':
                return 'bg-blue-500';
            case 'Brn':
                return 'bg-yellow-700';
            case 'G':
                return 'bg-green-500';
            case 'Org':
                return 'bg-orange-500';
            case 'P':
                return 'bg-purple-500';
            case 'Pink':
                return 'bg-pink-500';
            case 'Y':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-500';
        }
    }

    const calculateEtaMinutes = (arrivalTime: string) => {  
        const arrival = moment.tz(arrivalTime, "America/Chicago");
        const now = moment.tz("America/Chicago");
        const diffMins = arrival.diff(now, 'minutes');
        return diffMins;
    }

    const etaMinutes = calculateEtaMinutes(eta.arrT);

    return (
        <div className={`p-2 rounded-xl ${routeToColor(eta.rt)}`}>
            <h3 className="text-lg font-bold">{eta.destNm}</h3>
            <div className='flex justify-between'>
                <p className="text-white">{etaMinutes} minutes</p>
                {eta.isDly === '1' && <p className="text-white">Delayed</p>}
                {eta.isApp === '1' && <p className="text-white">Approaching</p>}
            </div>
            <div className='flex justify-between'>
                
            </div>
        </div>
    );
};

export default Eta;