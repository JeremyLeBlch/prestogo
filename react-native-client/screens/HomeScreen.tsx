import { ActivityIndicator, Text } from "react-native";
import CityFlatList from "../components/CityFlatList";
import Header from "../components/Header";
import { City } from "../types";
import { useQuery } from "@apollo/client";
import { GET_CITIES } from "../queries";

function HomeScreen({ navigation }: { navigation: any }) {
    const { loading, error, data } = useQuery(GET_CITIES);

    if (loading) {
      return <ActivityIndicator size="large" />;
    }
  
    if (error) {
      return <Text>Une erreur est survenue : {error.message}</Text>;
    }

    function navigateTo(city: City) {
        navigation.navigate("City", { id: city.id })
    }

    return (
        <>
            <Header />
            <CityFlatList navigate={(city: City) => { navigateTo(city) }} cities={data.cities} />
        </>
    )
}

export default HomeScreen;