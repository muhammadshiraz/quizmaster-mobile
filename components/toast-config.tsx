import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { StyleSheet } from "react-native";

export const toastConfig = {
  success: ({ text1, text2 }: any) => (
    <ThemedView style={styles.success}>
      <ThemedText style={styles.text}>{text1}</ThemedText>
      <ThemedText style={styles.subText}>{text2}</ThemedText>
    </ThemedView>
  ),
  error: ({ text1, text2 }: any) => (
    <ThemedView style={styles.error}>
      <ThemedText style={styles.text}>{text1}</ThemedText>
      <ThemedText style={styles.subText}>{text2}</ThemedText>
    </ThemedView>
  ),
};

const styles = StyleSheet.create({
  success: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 10,
    width: "90%",
  },
  error: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 10,
    width: "90%",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  subText: {
    color: "white",
    fontSize: 14,
  },
});
