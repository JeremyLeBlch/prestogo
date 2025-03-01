import { useState } from "react";
import { StyleSheet, Pressable, TextInput, Text, View } from "react-native";

import { Goal } from "../types";

type GoalInputProps = {
  appendGoal: (goal: Goal) => void;
};

const GoalInput: React.FC<GoalInputProps> = ({ appendGoal }: { appendGoal: any }) => {
  const [goal, setGoal] = useState("");
  // The following state is used to change the display dynamically.
  const [isClicked, setIsClicked] = useState(false);

  function addGoal() {
    if (goal.trim()) {
      // Creating a new goal~
      const newGoal: Goal = {
        text: goal.trim(),
        id: (Math.random() * Math.random()).toString()
      };
      appendGoal(newGoal);
      // Resetting the goal~
      setGoal("");
      // Changing the "isClicked" state and back~
      setIsClicked(previous => !previous);
      setTimeout(() => {
        setIsClicked(previous => !previous);
      }, 500);
    }
  }

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder={"What do I have to do?"}
        placeholderTextColor={"#999"}
        value={goal}
        onChangeText={setGoal}
      />
      <Pressable
        // @ts-ignore
        style={styles.pressable(isClicked)}
        onPress={addGoal}
      >
        <Text
          // @ts-ignore
          style={styles.label(isClicked)}
        >
          {isClicked ? "Goal added!" : "Add [+]"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 5
  },
  input: {
    flex: 3,
    backgroundColor: "#000",
    color: "#FFF",
    padding: 25,
    borderRadius: 5
  },
  // @ts-ignore
  pressable: (isClicked: boolean) => ({
    flex: 1,
    padding: 25,
    borderRadius: 5,
    backgroundColor: !isClicked ? "#000" : "#FFF",
    borderColor: !isClicked ? "#FFF" : "#000",
    borderWidth: 2
  }),
  // @ts-ignore
  label: (isClicked: boolean) => ({
    color: !isClicked ? "#FFF" : "#000",
    textAlign: "center"
  })
});

export default GoalInput;
