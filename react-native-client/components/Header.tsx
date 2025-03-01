import { StyleSheet, Text, View } from 'react-native';

function Header() {
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Bienvenue sur...</Text>
      <Text style={ styles.subtitle }>Presto'Go !</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container : {
    borderBottomColor: "#dedede",
    borderBottomWidth: 2,
    padding: 8,
  },
  title:{
    fontSize: 20,
    opacity: 0.5
  },
  subtitle: {
    fontSize: 36,
    fontWeight: "bold"

  }
})

export default Header;