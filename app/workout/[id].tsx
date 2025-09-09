import Exercise from "@/components/Exercise";
import Timer from "@/components/Timer";
import { H1 } from "@/components/Typography";
import { workoutTemplates } from "@/constants/workouts";
import { useTimer } from "@/hooks/useTimer";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Workout() {
  const { id } = useLocalSearchParams();
  const threeMinuteSeconds = 180;
  const workoutTemplate = workoutTemplates.find((wt) => wt.name === id);
  const { exerciseState, addWorkout } = useWorkoutStore();
  const { seconds, isRunning, start, pause, reset, setSeconds } =
    useTimer(threeMinuteSeconds);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="h-full  bg-gray-900  ">
        <View
          className=" h-full  justify-between"
          style={{ paddingBottom: 25 }}
        >
          <View className="flex flex-col gap-2 w-full " style={{ padding: 20 }}>
            <H1 className="border-b border-gray-600">Workout {id}</H1>
            {workoutTemplate?.exercises.map((exercise, index) => (
              <Exercise
                name={exercise.name}
                weight={exerciseState[exercise.name].currentWeight}
                key={index}
                startTimer={start}
                isRunning={isRunning}
                pauseTimer={pause}
                resetTimer={reset}
                setSeconds={setSeconds}
              />
            ))}
          </View>
          <Timer
            minutes={Math.floor(seconds / 60)}
            seconds={seconds % 60}
            elapsedTime={(seconds / threeMinuteSeconds) * 100}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
