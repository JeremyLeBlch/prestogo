import { View, Text, Pressable, StyleSheet } from "react-native";

import { Goal } from "../types";

type GoalItemProps = {
  goal: Goal;
  destroy: (goal: Goal) => void;
};

const GoalItem: React.FC<GoalItemProps> = ({ goal, destroy }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{goal.text}</Text>
      <Pressable style={styles.pressable} onPress={() => destroy(goal)}>
        <Text style={styles.label}>❌</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 25,
    borderRadius: 5,
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderWidth: 2,
    gap: 5
  },
  text: {
    flex: 7,
    color: "#000"
  },
  pressable: {
    flex: 1,
    padding: 25,
    borderRadius: 5,
    backgroundColor: "#000",
    borderColor: "#FFF",
    borderWidth: 2
  },
  label: {
    color: "#FFF",
    textAlign: "center"
  }
});

export default GoalItem;
