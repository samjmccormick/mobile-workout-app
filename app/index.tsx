import { Body, H1, H2 } from "@/components/Typography";
import { workoutTemplates } from "@/constants/workouts";
import { Link } from "expo-router";

import {
  backgroundColor,
  borderColor,
  complementaryColor,
} from "@/constants/colors";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function Index() {
  const { workouts, exerciseState } = useWorkoutStore();
  const recentWorkouts = workouts.slice(-4).reverse();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        className="h-full flex flex-col  p-5"
        style={{ backgroundColor: backgroundColor }}
      >
        <H2 className="border-b mb-4" style={{ borderColor: borderColor }}>
          Start New Workout
        </H2>
        <View className="flex flex-col gap-4 mb-4">
          {workoutTemplates.map((workout) => (
            <Link
              href={{
                pathname: "/workout/[id]",
                params: { id: workout.name },
              }}
              prefetch
              asChild
              key={workout.name}
            >
              <Pressable
                className="flex flex-col rounded-md gap-2  p-3 border-2 shadow-black"
                style={
                  workouts[workouts.length - 1].name === workout.name
                    ? { borderColor: borderColor }
                    : { borderColor: complementaryColor }
                }
              >
                <H1 className="border-b" style={{ borderColor: borderColor }}>
                  Workout {workout.name}
                </H1>
                {workout.exercises.map((exercise, index) => (
                  <View key={index} className="flex flex-row justify-between">
                    <Body>{exercise.name}</Body>
                    <Body>
                      {exerciseState[exercise.name].lastFailed
                        ? exerciseState[exercise.name].currentWeight
                        : exerciseState[exercise.name].currentWeight + 5}{" "}
                      lb
                    </Body>
                  </View>
                ))}
              </Pressable>
            </Link>
          ))}
        </View>
        <H2 className="border-b" style={{ borderColor: borderColor }}>
          Previous Workouts
        </H2>
        <ScrollView>
          <View className="flex flex-col">
            {recentWorkouts.map((workout) => (
              <View
                key={workout.id}
                className="flex flex-col rounded-md gap-2 mt-4 p-3 border-2 shadow-black"
                style={{ borderColor: borderColor }}
              >
                <H2 className="border-b " style={{ borderColor: borderColor }}>
                  Workout {workout.name} - {workout.date.toLocaleDateString()}
                </H2>
                {workout.exercises.map((exercise, index) => (
                  <View key={index} className="flex flex-row justify-between">
                    <Body
                      style={{
                        color: exercise.failed ? complementaryColor : "white",
                        opacity: 0.8,
                      }}
                    >
                      {exercise.name}
                    </Body>
                    <Body
                      style={{
                        color: exercise.failed ? complementaryColor : "white",
                        opacity: 0.8,
                      }}
                    >
                      {" "}
                      {exercise.weight} lb
                    </Body>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
