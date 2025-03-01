import { City } from "@prisma/client";

import WeatherAPI from "../../datasources/WeatherAPI";

export default {
    restaurants: (parent: City, _, { datasources }) => {
        return datasources.city.getRelated(parent.id, "restaurants");
    },
    coordinates: (parent: City) => {
        return { latitude: parent.latitude, longitude: parent.longitude };
    },
    weather: (parent: City, _, { datasources }) => datasources.weather.findByCoordinates(parent)
}