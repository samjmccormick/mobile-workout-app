import Exercise from "@/components/Exercise";
import Timer from "@/components/Timer";
import { H1, H2 } from "@/components/Typography";
import { backgroundColor, primaryColor } from "@/constants/colors";
import { workoutTemplates } from "@/constants/workouts";
import { useTimer } from "@/hooks/useTimer";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Workout() {
  const { id } = useLocalSearchParams();
  const threeMinuteSeconds = 180;

  const workoutTemplate = workoutTemplates.find((wt) => wt.name === id);
  const { exerciseState, addWorkout } = useWorkoutStore();
  const { seconds, timerLength, start, reset, setDuration } =
    useTimer(threeMinuteSeconds);
  const [failedExercises, setFailedExercises] = useState<
    { name: string; failed: boolean }[]
  >([]);

  function handleFailedExercise(name: string) {
    if (
      failedExercises.length === 0 ||
      !failedExercises.find((fe) => fe.name === name)
    ) {
      setFailedExercises([...failedExercises, { name: name, failed: true }]);
    }
  }
  function handleCompletePress() {
    if (typeof id !== "string" || !workoutTemplate) {
      return;
    }

    const updatedWorkout = {
      name: typeof id === "string" ? id : "",
      id: Number(Date.now()),
      date: new Date(),
      exercises: workoutTemplate?.exercises.map((ex) => ({
        name: ex.name,
        weight: exerciseState[ex.name].currentWeight + 5,
        failed:
          failedExercises.find((fe) => fe.name === ex.name)?.failed || false,
      })),
    };
    addWorkout(updatedWorkout);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        className="h-full "
        style={{ backgroundColor: backgroundColor }}
      >
        <View
          className=" h-full  justify-between"
          style={{ paddingBottom: 25 }}
        >
          <View className="flex flex-col gap-2 w-full " style={{ padding: 20 }}>
            <H1 className="border-b border-gray-600">Workout {id}</H1>
            {workoutTemplate?.exercises.map((exercise, index) => (
              <Exercise
                name={exercise.name}
                weight={
                  exerciseState[exercise.name].lastFailed
                    ? exerciseState[exercise.name].currentWeight
                    : exerciseState[exercise.name].currentWeight + 5
                }
                key={index}
                startTimer={start}
                resetTimer={reset}
                setDuration={setDuration}
                handleFailedExercise={handleFailedExercise}
              />
            ))}
            <Timer
              minutes={Math.floor(seconds / 60)}
              seconds={seconds % 60}
              elapsedTime={(seconds / timerLength) * 100}
            />
          </View>

          <View className="p-3">
            <Pressable
              className="w-full items-center p-3 rounded-full"
              style={{ backgroundColor: primaryColor }}
              onPress={handleCompletePress}
            >
              <H2>Complete</H2>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
