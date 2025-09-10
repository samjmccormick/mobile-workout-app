import { useState } from "react";
import { Pressable, View } from "react-native";
import { Body, H2 } from "./Typography";

export default function Exercise({
  name,
  weight,
  startTimer,
  resetTimer,
  setDuration,
  handleFailedExercise,
}: {
  name: string;
  weight: number;
  startTimer: () => void;
  resetTimer: () => void;
  setDuration: (duration: number) => void;
  handleFailedExercise: (name: string) => void;
}) {
  const fiveMinuteSeconds = 300;
  const [reps, setReps] = useState([
    { reps: 5, pressed: false },
    { reps: 5, pressed: false },
    { reps: 5, pressed: false },
    { reps: 5, pressed: false },
    { reps: 5, pressed: false },
  ]);
  function handlePress(i: number) {
    if (reps[i].reps === 0) return;

    if (!reps[i].pressed) {
      const newReps = [...reps];
      newReps[i].pressed = true;
      setReps(newReps);
      resetTimer();
      startTimer();
    } else {
      const newReps = [...reps];
      newReps[i].reps -= 1;
      setReps(newReps);
      setDuration(fiveMinuteSeconds);
      startTimer();
      handleFailedExercise(name);
    }
  }
  return (
    <View className="flex flex-col">
      <View className="flex flex-row justify-between items-center">
        <Body>{name}</Body>
        <Body>{weight} lbs</Body>
      </View>
      <View className="flex flex-row justify-between">
        {reps.map((rep, index) => (
          <Pressable
            key={index}
            className="size-16 rounded-full w-11flex items-center justify-center"
            onPress={() => handlePress(index)}
            style={{
              backgroundColor: rep.pressed ? "#bd3f00" : "#007ebd",
            }}
          >
            <H2>{rep.reps}</H2>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
