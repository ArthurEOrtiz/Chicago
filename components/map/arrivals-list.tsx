import Eta from "../cta/eta";

interface ArrivalsListProps {
    loadingArrivals: boolean;
    arrivals: CtaApiResponse | null;
}

const ArrivalsList: React.FC<ArrivalsListProps> = ({ loadingArrivals, arrivals }) => {
    return (
        <>
            {loadingArrivals ? (
                <div className="p-2 rounded-xl  bg-gray-500 flex justify-center">
                    <span className='loading loading-spinner loading-lg'></span>
                </div>
            ) : arrivals ? (
                arrivals.ctatt.eta ? (
                    arrivals.ctatt.eta.map((eta: Eta, index: number) => (
                        <Eta key={index} eta={eta} />
                    ))
                ) : (
                    <div className="p-2  rounded-xl bg-error-content">
                        <p className='text-error'>No arrivals found.</p>
                    </div>
                )
            ) : (
                <div className="p-2  rounded-xl bg-warning-content">
                    <p className='text-warning'>Select a station on the map or the list.</p>
                </div>
            )}
        </>
    );
}

export { ArrivalsList };