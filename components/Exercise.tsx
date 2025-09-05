import { Button, TextInput, View } from "react-native";
import { Body } from "./Typography";

export default function Exercise({
  name,
  weight,
}: {
  name: string;
  weight: number;
}) {
  const rows = [];
  for (let i = 0; i < 5; i++) {
    rows.push(<Button title="5" />);
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
