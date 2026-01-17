import { borderColor, complementaryColor } from "@/constants/colors";
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
  setAllPressed,
}: {
  name: string;
  weight: number;
  startTimer: () => void;
  resetTimer: () => void;
  setDuration: (duration: number) => void;
  handleFailedExercise: (name: string) => void;
  setAllPressed: (pressed: boolean) => void;
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
      // check if all reps are pressed, probably not the most efficient but does the job
      if (name === "Deadlift" ? reps[0].pressed : reps.every((r) => r.pressed))
        setAllPressed(true);
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
    <View className="flex flex-col gap-2">
      <View className="flex flex-row justify-between items-center">
        <Body>{name}</Body>
        <Body>{weight} lbs</Body>
      </View>
      <View className="flex flex-row justify-between">
        {name === "Deadlift" ? (
          <Pressable
            key={0}
            className="size-16 rounded-full  flex border-2 items-center justify-center"
            onPress={() => handlePress(0)}
            style={{
              borderColor: reps[0].pressed ? complementaryColor : borderColor,
            }}
          >
            <H2>{reps[0].reps}</H2>
          </Pressable>
        ) : (
          reps.map((rep, index) => (
            <Pressable
              key={index}
              className="size-16 rounded-full  flex border-2 items-center justify-center"
              onPress={() => handlePress(index)}
              style={{
                borderColor: rep.pressed ? complementaryColor : borderColor,
              }}
            >
              <H2>{rep.reps}</H2>
            </Pressable>
          ))
        )}
      </View>
    </View>
  );
}
