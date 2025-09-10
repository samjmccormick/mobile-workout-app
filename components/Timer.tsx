import { complementaryColor } from "@/constants/colors";
import { View } from "react-native";
import { H } from "./Typography";

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
    <View className="flex flex-col justify-between items-center p-3 gap-10">
      <View className="h-1 w-full rounded-sm  items-end">
        <View
          className="h-full rounded-sm "
          style={{
            width: `${elapsedTime}%`,
            backgroundColor: complementaryColor,
          }}
        ></View>
      </View>
      <View className="flex flex-row gap-1">
        <H>
          {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
        </H>
      </View>
      <View className="h-1 w-full rounded-sm  items-start">
        <View
          className="h-full rounded-sm "
          style={{
            width: `${elapsedTime}%`,
            backgroundColor: complementaryColor,
          }}
        ></View>
      </View>
    </View>
  );
}
