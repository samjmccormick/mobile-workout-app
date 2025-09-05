import { Body, H1, H2 } from "@/components/Typography";
import { initialWorkouts } from "@/constants/workouts";
import { Link } from "expo-router";

import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { Pressable, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function Index() {
  const { workouts } = useWorkoutStore();
  const cardFormatting =
    "flex flex-col rounded-md gap-2 bg-gray-800 border-gray-600 p-3 border-2 shadow-black";
  const cardFormattingNext =
    "flex flex-col rounded-md gap-2 bg-gray-800 border-green-300 p-3 border-2 shadow-black";
  const recentWorkouts = workouts.slice(-2).reverse();

  return (
    <SafeAreaProvider>
      <SafeAreaView className="h-full flex flex-col gap-4 bg-gray-900 p-5">
        <H2 className="border-b border-gray-600">Start New Workout</H2>
        {initialWorkouts.map((workout) => (
          <Link
            href={{
              pathname: "/workout/[id]",
              params: { id: workout.name },
            }}
            asChild
            key={workout.id}
          >
            <Pressable
              className={
                workouts[workouts.length - 1].name === workout.name
                  ? cardFormatting
                  : cardFormattingNext
              }
            >
              <H1 className="border-b border-gray-600 ">
                Workout {workout.name}
              </H1>
              {workout.exercises.map((exercise, index) => (
                <View key={index} className="flex flex-row justify-between">
                  <Body>{exercise.name}</Body>
                  <Body>{exercise.weight + 5} lb</Body>
                </View>
              ))}
            </Pressable>
          </Link>
        ))}
        <H2 className="border-b border-gray-600">Previous Workouts</H2>
        {recentWorkouts.map((workout) => (
          <View key={workout.id} className={cardFormatting}>
            <H2 className="border-b border-gray-600 ">
              Workout {workout.name} - {workout.date.toLocaleDateString()}
            </H2>
            {workout.exercises.map((exercise, index) => (
              <View
                key={index}
                className={
                  exercise.failed
                    ? "flex flex-row justify-between border-b border-red-500"
                    : "flex flex-row justify-between"
                }
              >
                <Body>{exercise.name}</Body>
                <Body>{exercise.weight} lb</Body>
              </View>
            ))}
          </View>
        ))}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
