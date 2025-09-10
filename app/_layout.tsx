import { backgroundColor } from "@/constants/colors";
import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1,
          backgroundColor:
            backgroundColor /* I don't think this background color is necssary */,
        }}
      >
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: backgroundColor }, //this is necessary to prevent a white screen
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" options={{ freezeOnBlur: true }} />
          <Stack.Screen name="workout/[id]" options={{ freezeOnBlur: true }} />
        </Stack>
      </View>
    </SafeAreaProvider>
  );
}
