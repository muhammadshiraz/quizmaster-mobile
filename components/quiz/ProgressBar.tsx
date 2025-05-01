import { ThemedView } from "../ThemedView";
import { StyleSheet } from "react-native";

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.progress, { width: `${progress * 100}%` }]} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginBottom: 20,
    width: "100%",
  },
  progress: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
});
