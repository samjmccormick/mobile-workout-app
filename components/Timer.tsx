import { View } from "react-native";
import { H1 } from "./Typography";

export default function Timer({
  minutes,
  seconds,
  elapsedTime,
}: {
  minutes: number;
  seconds: number;
  elapsedTime: number;
}) {
  return (
    <View className="flex flex-col justify-between items-center bg-gray-600 pt-2 gap-2">
      <View className="flex flex-row gap-1">
        <H1>
          {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
        </H1>
      </View>
      <View className="h-1 w-full rounded-sm bg-gray-300 flex flex-start">
        <View
          className="h-full bg-red-600 rounded-sm "
          style={{ width: `${elapsedTime}%` }}
        ></View>
      </View>
    </View>
  );
}
