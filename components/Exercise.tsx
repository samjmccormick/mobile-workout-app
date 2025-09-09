import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Body, H2 } from "./Typography";

export default function Exercise({
  name,
  weight,
  startTimer,
  isRunning,
  pauseTimer,
  resetTimer,
  setSeconds,
}: {
  name: string;
  weight: number;
  startTimer: () => void;
  isRunning: boolean;
  pauseTimer: () => void;
  resetTimer: () => void;
  setSeconds: (seconds: number) => void;
}) {
  const [reps, setReps] = useState([
    { reps: 5, pressed: false },
    { reps: 5, pressed: false },
    { reps: 5, pressed: false },
    { reps: 5, pressed: false },
    { reps: 5, pressed: false },
  ]);
  function handlePress(i: number) {
    if (reps[i].reps === 0) return;

    if (!reps[i].pressed!) {
      const newReps = [...reps];
      newReps[i].pressed = true;
      setReps(newReps);
      resetTimer();
      startTimer();
    } else {
      const newReps = [...reps];
      newReps[i].reps -= 1;
      setReps(newReps);
      resetTimer();
      setSeconds(60 * 5);
      startTimer();
    }
  }
  return (
    <View className="flex flex-col">
      <View className="flex flex-row justify-between items-center">
        <Body>{name}</Body>
        <TextInput className="text-white/80">{weight} lbs</TextInput>
      </View>
      <View className="flex flex-row justify-between">
        {reps.map((rep, index) => (
          <Pressable
            key={index}
            className="size-16 rounded-full bg-red-900 flex items-center justify-center"
            onPress={() => handlePress(index)}
          >
            <H2>{rep.reps}</H2>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
