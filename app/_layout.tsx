import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import { useColorScheme } from "@/hooks/useColorScheme";
import { toastConfig } from '@/components/toast-config';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="quiz-screen" />
        <Stack.Screen name="result-screen" />
      </Stack>
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}