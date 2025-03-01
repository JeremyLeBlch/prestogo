import { Forecast } from "../types";
import { Text, View } from "react-native";
import WeatherIcon from "./WeatherIcon";

function WeatherCard({ forecast }: { forecast: Forecast }) {

    function formatDate(date: string) {
        const $date = new Date(date);
        return $date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }

    return (
        <View style={{ alignItems: "center", justifyContent: "center"}} >
            <Text>{ formatDate(forecast.date) }</Text>
            <WeatherIcon condition={forecast.condition} size={36} />
            <Text>{ forecast.temperature }°C</Text>
        </View>
    );
}

export default WeatherCard;