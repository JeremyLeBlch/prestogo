import { FlatList, View, Text, StyleSheet } from "react-native";
import { Restaurant } from "../types";
import RestaurantCard from "./RestaurantCard";

function RestaurantFlatList({ restaurants }: { restaurants: Restaurant[] }) {
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<Text style={styles.header}>Liste des restaurants</Text>}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        data={restaurants}
        renderItem={({ item }: { item: Restaurant }) => <RestaurantCard restaurant={item} />}
        keyExtractor={(item: Restaurant, index) => `${item.name}-${index}`}
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

export default RestaurantFlatList;
