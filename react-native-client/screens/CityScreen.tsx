import { useQuery } from "@apollo/client";
import CityCard from "../components/CityCard";
import { GET_CITY } from "../queries";
import { ActivityIndicator, Text, View, useWindowDimensions } from "react-native";
import { Forecast } from "../types";
import WeatherCard from "../components/WeatherCard";
import { useMemo } from "react";
import RestaurantFlatList from "../components/RestaurantFlatList";

function CityScreen({ route }: { route: any }) {
  const { width } = useWindowDimensions();
  const { id } = route.params;

  const { loading, error, data } = useQuery(GET_CITY, {
    variables: { cityId: id }
  });

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Une erreur est survenue : {error.message}</Text>;
  }

  return (
    <>
      <CityCard city={data.city} />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#0ac2a6",
          padding: 10
        }}
      >
        {data.city.weather.forecast.slice(0, Math.floor(width / 100)).map((day: Forecast) => (
          <WeatherCard key={day.date} forecast={day} />
        ))}
      </View>
      <View style={{ flex: 10 }}>
        <RestaurantFlatList restaurants={data.city.restaurants} />
      </View>
    </>
  );
}

export default CityScreen;
