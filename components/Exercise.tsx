import { Pressable, TextInput, View } from "react-native";
import { Body, H2 } from "./Typography";

export default function Exercise({
  name,
  weight,
}: {
  name: string;
  weight: number;
}) {
  const rows = [];
  for (let i = 0; i < 5; i++) {
    rows.push(
      <Pressable
        key={i}
        className="size-16 rounded-full bg-red-900 flex items-center justify-center"
      >
        <H2>5</H2>
      </Pressable>
    );
  }

  return (
    <View className="flex flex-col">
      <View className="flex flex-row justify-between items-center">
        <Body>{name}</Body>
        <TextInput className="text-white/80">{weight} lbs</TextInput>
      </View>
      <View className="flex flex-row justify-between">{rows}</View>
    </View>
  );
}
