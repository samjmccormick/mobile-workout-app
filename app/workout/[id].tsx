import { useLocalSearchParams } from "expo-router";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Workout() {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaProvider>
      <SafeAreaView className="h-full flex flex-col gap-4 bg-gray-900 p-5"></SafeAreaView>
    </SafeAreaProvider>
  );
}
