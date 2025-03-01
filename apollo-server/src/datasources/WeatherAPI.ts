import { AugmentedRequest, CacheOptions, RESTDataSource } from "@apollo/datasource-rest";
import { ValueOrPromise } from "@apollo/datasource-rest/dist/RESTDataSource";

export type Weather = {
    forecast: {
        date: Date,
        temperature: number,
        condition: string
    }[]
};

class WeatherAPI extends RESTDataSource {
    override baseURL = "https://api.tomorrow.io/";

    getCondition(weatherCode) {
        const conditions = {
            "0": "Unknown",
            "1000": "Clear, Sunny",
            "1100": "Mostly Clear",
            "1101": "Partly Cloudy",
            "1102": "Mostly Cloudy",
            "1001": "Cloudy",
            "2000": "Fog",
            "2100": "Light Fog",
            "4000": "Drizzle",
            "4001": "Rain",
            "4200": "Light Rain",
            "4201": "Heavy Rain",
            "5000": "Snow",
            "5001": "Flurries",
            "5100": "Light Snow",
            "5101": "Heavy Snow",
            "6000": "Freezing Drizzle",
            "6001": "Freezing Rain",
            "6200": "Light Freezing Rain",
            "6201": "Heavy Freezing Rain",
            "7000": "Ice Pellets",
            "7101": "Heavy Ice Pellets",
            "7102": "Light Ice Pellets",
            "8000": "Thunderstorm"
        };
        return conditions[weatherCode];
    }


    // Asynchronous method 'findByCoordinates' is defined to fetch weather forecast for given coordinates.
    // It is an object that should contain 'latitude' and 'longitude' properties.
    async findByCoordinates({ latitude, longitude }): Promise<Weather> {
        const data = await this.get("/v4/weather/forecast", {
            params: {
                location: `${latitude},${longitude}`,
                timesteps: "daily",
                units: "metric"
            }
        })

        const forecast = data.timelines.daily.map(({ time, values}) => {
            return {
                date: new Date(time),
                temperature: values.temperatureAvg,
                condition: this.getCondition(values.weatherCodeMax)
            };
        })
        return { forecast };
    }

    protected willSendRequest(path: string, requestOpts: AugmentedRequest<CacheOptions>): ValueOrPromise<void> {
        requestOpts.params.set("apikey", process.env.WEATHER_API_KEY);
    }
}

export default WeatherAPI;