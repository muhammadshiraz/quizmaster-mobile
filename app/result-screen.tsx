import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import questions from "@/constants/data/quiz-questions.json";
import Toast from "react-native-toast-message";

export default function ResultScreen() {
  const router = useRouter();
  const { score } = useLocalSearchParams();
  const numericScore = Number(score);

  const saveScore = async () => {
    try {
      const existingScores = await AsyncStorage.getItem("quizScores");
      const parsedScores = existingScores ? JSON.parse(existingScores) : [];

      const newScoreEntry = {
        score: numericScore,
        date: new Date().toLocaleString(),
        totalQuestions: questions.questions.length,
      };

      await AsyncStorage.setItem(
        "quizScores",
        JSON.stringify([...parsedScores, newScoreEntry])
      );

      Toast.show({
        type: "success",
        text1: "Score Saved!",
        text2: "Your result has been stored successfully 👏",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Save Failed",
        text2: "Could not save your score. Please try again.",
      });
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        🎉 Quiz Completed!
      </ThemedText>

      <ThemedText type="subtitle" style={styles.score}>
        ✅ Correct: {numericScore}
      </ThemedText>

      <ThemedText type="subtitle" style={styles.score}>
        ❌ Wrong: {questions.questions.length - numericScore}
      </ThemedText>

      <TouchableOpacity
        style={[styles.button, styles.saveButton]}
        onPress={saveScore}
      >
        <ThemedText style={styles.buttonText}>💾 Save Score</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.restartButton]}
        onPress={() =>
          router.push({
            pathname: "/quiz-screen",
            params: { refresh: Date.now() },
          })
        }
      >
        <ThemedText style={styles.buttonText}>🔄 Try Again</ThemedText>
      </TouchableOpacity>

      <Toast />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: "bold",
  },
  score: {
    fontSize: 24,
    marginVertical: 10,
  },
  button: {
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: "#2ecc71",
  },
  restartButton: {
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
