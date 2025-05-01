import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Question } from "@/constants/quiz-types";

export default function QuestionScreen({
  question,
  onSelect,
}: {
  question: Question;
  onSelect: (index: number) => void;
}) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.questionText}>
        {question.question}
      </ThemedText>

      {question.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => onSelect(index)}
        >
          <ThemedText style={styles.optionText}>{option}</ThemedText>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
  },
  questionText: {
    fontSize: 24,
    marginBottom: 25,
  },
  optionButton: {
    backgroundColor: "#F0F4F8",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#DEE8F2",
  },
  optionText: {
    fontSize: 16,
  },
});
