import { View, Text, Pressable } from "react-native";
import { Restaurant } from "../types";

function RestaurantCard({ restaurant }: { restaurant: Restaurant}) {
    return (
        <View style={{ borderColor: "black", borderWidth: 2, borderRadius: 10, padding: 10, gap: 10 }}>
              <View style={{ padding: 2 }}>
                <Text style={{ textTransform: "uppercase" }}>{restaurant.name}</Text>
              </View>
    
              <View style={{ gap: 5 }}>
                <Text>{restaurant.description} - Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla culpa maiores architecto, temporibus vitae aperiam. Odit officia repellat nam voluptate.</Text>
                <View style={{ flexDirection: "row", gap: 5 }}>
                    { restaurant.cuisines.map(cuisine => <Text style={{ backgroundColor: "#0ac2a6", padding: 5}}>{cuisine.label}</Text>) }
                </View>
              </View>
        </View>
      );
}

export default RestaurantCard;