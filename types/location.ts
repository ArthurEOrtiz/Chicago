interface Location {
    latitude: string;
    longitude: string;
    //human_address: string;
}

// As far as i can tell human_address is not implmented by the city of chicago.
// I've never seen it return anything other than "{\"address\": \"\", \"city\": \"\", \"state\": \"\", \"zip\": \"\"}"