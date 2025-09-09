import Exercise from "@/components/Exercise";
import { H1 } from "@/components/Typography";
import { workoutTemplates } from "@/constants/workouts";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Workout() {
  const { id } = useLocalSearchParams();
  const workoutTemplate = workoutTemplates.find((wt) => wt.name === id);
  const { exerciseState, addWorkout } = useWorkoutStore();

  return (
    <SafeAreaProvider>
      <SafeAreaView className="h-full flex flex-col  gap-2 bg-gray-900 p-5">
        <H1 className="border-b border-gray-600">Workout {id}</H1>
        {workoutTemplate?.exercises.map((exercise, index) => (
          <Exercise
            name={exercise.name}
            weight={exerciseState[exercise.name].currentWeight}
            key={index}
          />
        ))}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
