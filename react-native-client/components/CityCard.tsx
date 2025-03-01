import { Pressable, View, Text, Linking, StyleSheet } from "react-native";
import { City } from "../types";

function CityCard({ city }: { city: City }) {
  return (
    <View style={styles.cityCard}>
        <View style={styles.row}>
          <View style={styles.cityCardLogo}>
            <Text style={styles.cityCardLogoText}>{city.name.charAt(0)}</Text>
          </View>

          <View style={styles.cityCardDescription}>
            <Text style={styles.cityCardText}>{city.name}</Text>
            <Pressable
              onPress={async () => {
                await Linking.openURL(
                  `https://www.google.fr/maps/place/${city.coordinates.latitude},${city.coordinates.longitude}`
                );
              }}
              style={styles.showOnMapButton}
            >
              <Text>Afficher sur la carte</Text>
            </Pressable>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    row: {
      flex: 1,
      flexDirection: "row"
    },
  
    title: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 5
    },
  
    cityCard: {
      backgroundColor: "#ffffff",
      borderColor: "#dedede",
      borderWidth: 1,
      padding: 16,
      borderRadius: 12,
      flex: 1,
      justifyContent: "center"
    },
  
    cityCardLogo: {
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0ac2a6",
      borderRadius: 50
    },
  
    cityCardLogoText: {
      fontSize: 30,
      color: "#ffffff",
      paddingBottom: 4
    },
  
    cityCardText: {
      fontSize: 22
    },
  
    cityCardDescription: {
      marginLeft: 20,
      flex: 1
    },
  
    showOnMapButton: {
      marginTop: 6,
      borderRadius: 6,
      backgroundColor: "#9CC1E5",
      padding: 8,
      alignSelf: "flex-start"
    }
  });

  export default CityCard;
