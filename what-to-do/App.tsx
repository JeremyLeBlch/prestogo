import { AppRegistry, SafeAreaView } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { Goal } from "./types";

import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";


export default function App() {
  const [goals, setGoals] = useState<Goal[]>([]);

  return (
      <View style={styles.wrapper}>
        <GoalInput
          appendGoal={(goal: Goal) => {
            setGoals(previous => [...previous, goal]);
          }}
        />
        <SafeAreaView style={styles.list}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={goals}
            renderItem={({ item }) => (
              <GoalItem
                goal={item}
                destroy={goal => {
                  setGoals(previous => previous.filter(({ id }) => goal.id !== id));
                }}
              />
            )}
            keyExtractor={item => item.id}
            // Adding a gap between each item~
            contentContainerStyle={{ gap: 10 }}
          />
        </SafeAreaView>
      </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 25
  },
  list: {
    flex: 9,
    width: "100%"
  }
});

AppRegistry.registerComponent("MyApplication", () => App);
