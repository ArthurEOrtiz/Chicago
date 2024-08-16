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
                return 'bg-cta-red';
            case 'Blue':
                return 'bg-cta-blue';
            case 'Brn':
                return 'bg-cta-brown';
            case 'G':
                return 'bg-cta-green';
            case 'Org':
                return 'bg-cta-orange';
            case 'P':
                return 'bg-cta-purple';
            case 'Pink':
                return 'bg-cta-pink';
            case 'Y':
                return 'bg-cta-yellow';
            default:
                return 'bg-cta-gray';
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
        <div className={`p-3 rounded-xl h-22 ${routeToColor(eta.rt)}`}>
            <div className='flex justify-between'>
                <h3 className=" text-white text-sm">Route #{eta.rn} to</h3>
            </div>
            <div className='flex justify-between'>
                <h3 className="text-xl text-white font-bold">{eta.destNm}</h3>
                {etaMinutes > 0 ? (  
                    <p className="text-xl text-white font-bold">{etaMinutes} min</p>
                ) : (
                    <p className="text-xl text-white font-bold">Approaching</p>
                )}
            </div>
            <div className='flex justify-between'>
                {eta.isDly === '1' && <p className="text-white">Delayed</p>}
            </div>
        </div>
    );
};

export default Eta;