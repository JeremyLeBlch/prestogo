import { useMemo } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function WeatherIcon({ condition, size = 24 }: { condition: string, size?: number }) {

    /*
    const [icon, setIcon] = useState<string>();

    useEffect(() => {
        const icons: { [key: string]: string } = {
            "Unknown": "weather-sunset",
            "Clear, Sunny": "weather-sunny",
            "Mostly Clear": "weather-sunny",
            "Partly Cloudy": "weather-partly-cloudy",
            "Mostly Cloudy": "weather-cloudy",
            "Cloudy": "weather-cloudy",
            "Fog": "weather-fog",
            "Light Fog": "weather-fog",
            "Drizzle": "weather-rainy",
            "Rain": "weather-pouring",
            "Light Rain": "weather-rainy",
            "Heavy Rain": "weather-pouring",
            "Snow": "weather-snowy",
            "Flurries": "weather-snowy",
            "Light Snow": "weather-snowy",
            "Heavy Snow": "weather-snowy-heavy",
            "Freezing Drizzle": "weather-snowy-rainy",
            "Freezing Rain": "weather-snowy-rainy",
            "Light Freezing Rain": "weather-snowy-rainy",
            "Heavy Freezing Rain": "weather-snowy-rainy",
            "Ice Pellets": "weather-hail",
            "Heavy Ice Pellets": "weather-hail",
            "Light Ice Pellets": "weather-hail",
            "Thunderstorm": "weather-lightning"
        };
        setIcon(icons[condition]);
    }, [condition])
    */


    const icon: any = useMemo(() => {
        return {
            "Unknown": "weather-sunset",
            "Clear, Sunny": "weather-sunny",
            "Mostly Clear": "weather-sunny",
            "Partly Cloudy": "weather-partly-cloudy",
            "Mostly Cloudy": "weather-cloudy",
            "Cloudy": "weather-cloudy",
            "Fog": "weather-fog",
            "Light Fog": "weather-fog",
            "Drizzle": "weather-rainy",
            "Rain": "weather-pouring",
            "Light Rain": "weather-rainy",
            "Heavy Rain": "weather-pouring",
            "Snow": "weather-snowy",
            "Flurries": "weather-snowy",
            "Light Snow": "weather-snowy",
            "Heavy Snow": "weather-snowy-heavy",
            "Freezing Drizzle": "weather-snowy-rainy",
            "Freezing Rain": "weather-snowy-rainy",
            "Light Freezing Rain": "weather-snowy-rainy",
            "Heavy Freezing Rain": "weather-snowy-rainy",
            "Ice Pellets": "weather-hail",
            "Heavy Ice Pellets": "weather-hail",
            "Light Ice Pellets": "weather-hail",
            "Thunderstorm": "weather-lightning"
        }[condition];
        // La valeur d'icon sera re-calculé uniquement lorsque la valeur de condition change.
    }, [condition])


    return <MaterialCommunityIcons name={icon} size={size} color={"black"} />
}

export default WeatherIcon;