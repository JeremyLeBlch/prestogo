import { useQuery } from "@apollo/client";
import { GET_CITIES } from "../queries";
import { FlatList, View, Text, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { City } from "../types";
import CityCard from "./CityCard";

function CityFlatList({ navigate, cities }: { navigate: Function, cities: City[] }) {

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<Text style={styles.header}>Liste des villes</Text>}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        data={cities}
        renderItem={({ item }: { item: City }) => <Pressable onPress={() => { navigate(item)}}><CityCard city={item} /></Pressable>}
        keyExtractor={(item: City) => String(item.id)}
        contentContainerStyle={{ gap: 5, padding: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F7",
    flex: 1
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    padding: 15,
    backgroundColor: "#F4F4F7"
  }
});

export default CityFlatList;
