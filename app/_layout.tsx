import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import * as SecureStore from "expo-secure-store";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider } from "react-redux";                              // >>>>> add import for store
import { store } from "../redux/store";                   // >>>>> add import for store

import crashlytics from '@react-native-firebase/crashlytics';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function getUser() {
  return SecureStore.getItem("user");
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),    // UNTUK SETTING FONT YANG DIBUTUHKAN
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),        // UNTUK SETTING FONT YANG DIBUTUHKAN
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),       // UNTUK SETTING FONT YANG DIBUTUHKAN
  });

  useEffect(() => {
    crashlytics().log('App started');
    if (loaded) {
      setTimeout(() => {
        if(getUser()) router.replace('/(tabs)')
      }, 200)

      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(order)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Provider>
    </ThemeProvider>
  );
}
