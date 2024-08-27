import { Stack } from "expo-router";

export default function ListCarLayout() {
  return (
    <Stack>
      <Stack.Screen screenOptions={{
        headerShown: false,
      }} name="index" />
      <Stack.Screen name="details/[id]" />
    </Stack>
  );
}
