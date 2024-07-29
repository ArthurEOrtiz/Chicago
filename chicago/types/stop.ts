interface Stop {
    stop_id: string;
    direction_id: string;
    station_name: string;
    station_descriptive_name: string;
    map_id: string;
    ada: boolean;
    red: boolean;
    blue: boolean;
    g: boolean;
    brn: boolean;
    p: boolean;
    pexp: boolean;
    y: boolean;
    pnk: boolean;
    o: boolean;
    location: {
        latitude: string;
        longitude: string;
    };
};
