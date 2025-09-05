import { Body, H1 } from "@/components/Typography";
import { initialWorkouts, Workout } from "@/constants/workouts";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function Index() {
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="h-full flex flex-col gap-4 bg-gray-900 p-5">
        {workouts.map((workout) => (
          <Link
            href={{
              pathname: "/workout/[id]",
              params: { id: workout.id },
            }}
            asChild
            key={workout.id}
          >
            <Pressable className="flex flex-col rounded-md gap-2 bg-gray-800 p-3 border-2 border-gray-600 shadow-black">
              <H1 className="border-b border-gray-600 ">
                Workout {workout.name}
              </H1>
              {workout.exercises.map((exercise, index) => (
                <View key={index} className="flex flex-row justify-between">
                  <Body>{exercise.name}</Body>
                  <Body>{exercise.weight}</Body>
                </View>
              ))}
            </Pressable>
          </Link>
        ))}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
