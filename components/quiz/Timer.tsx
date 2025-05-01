import { ThemedText } from "../ThemedText";
import { StyleSheet } from "react-native";

export default function Timer({ timeLeft }: { timeLeft: number }) {
  return <ThemedText style={styles.timer}>⏳ {timeLeft}s remaining</ThemedText>;
}

const styles = StyleSheet.create({
  timer: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E74C3C",
    marginBottom: 20,
  },
});
