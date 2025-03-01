import { useEffect, useState } from "react";
import { City } from "../types";
import { ScrollView, Text, View, Pressable, StyleSheet, Linking } from "react-native";
import CityCard from "./CityCard";

const API_URL: string = process.env.EXPO_PUBLIC_API_URL!;

function CityList() {
  const [cities, setCities] = useState<City[]>([]);

  async function getCities(): Promise<City[]> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `
                query Cities {
                    cities {
                      id
                      name
                      coordinates {
                        latitude
                        longitude
                      }
                    }
                  }`
      })
    });
    const {
      data: { cities }
    } = await response.json(); // { data: cities []}
    return cities;
  }

  useEffect(() => {
    getCities().then((data: City[]) => {
      setCities(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Liste des villes</Text>
      <ScrollView>
        {!!cities.length &&
          cities.map((city: City) => <View style={styles.listItem}><CityCard key={city.id} city={city} /></View>)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#F4F4F7",
    flex: 1
  },
  listItem: {
    marginVertical: 5
  }
});

export default CityList;
