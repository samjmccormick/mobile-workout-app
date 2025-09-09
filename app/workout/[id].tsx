import Exercise from "@/components/Exercise";
import Timer from "@/components/Timer";
import { H1, H2 } from "@/components/Typography";
import { backgroundColor, primaryColor } from "@/constants/colors";
import { workoutTemplates } from "@/constants/workouts";
import { useTimer } from "@/hooks/useTimer";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { useLocalSearchParams } from "expo-router";
import { Pressable, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Workout() {
  const { id } = useLocalSearchParams();
  const threeMinuteSeconds = 180;
  const fiveMinuteSeconds = 300;
  const workoutTemplate = workoutTemplates.find((wt) => wt.name === id);
  const { exerciseState, addWorkout } = useWorkoutStore();
  const { seconds, isRunning, start, pause, reset, setSeconds } =
    useTimer(threeMinuteSeconds);
  let timeLimit = threeMinuteSeconds;
  function failedTimer() {
    setSeconds(fiveMinuteSeconds);
    timeLimit = fiveMinuteSeconds;
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
                weight={exerciseState[exercise.name].currentWeight}
                key={index}
                startTimer={start}
                isRunning={isRunning}
                pauseTimer={pause}
                resetTimer={reset}
                failedTimer={failedTimer}
              />
            ))}
            <Timer
              minutes={Math.floor(seconds / 60)}
              seconds={seconds % 60}
              elapsedTime={(seconds / timeLimit) * 100}
            />
          </View>

          <View className="p-3">
            <Pressable
              className="w-full items-center p-3 rounded-full"
              style={{ backgroundColor: primaryColor }}
            >
              <H2>Complete</H2>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
