import { useFocusEffect } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "expo-router";
import questions from "@/constants/data/quiz-questions.json";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Question from "@/components/quiz/Question";
import Timer from "@/components/quiz/Timer";
import ProgressBar from "@/components/quiz/ProgressBar";
import { StyleSheet } from "react-native";

export default function QuizScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState({
    currentIndex: 0,
    score: 0,
    timeLeft: questions.questions[0]?.timeLimit || 30,
    totalTimeLeft: questions.totalTimeLimit || 300,
  });

  // Reset quiz state when screen focuses
  useFocusEffect(
    useCallback(() => {
      setProgress({
        currentIndex: 0,
        score: 0,
        timeLeft: questions.questions[0]?.timeLimit || 30,
        totalTimeLeft: questions.totalTimeLimit || 300,
      });
    }, [])
  );

  // Total time handler
  useEffect(() => {
    const totalTimer = setInterval(() => {
      setProgress((prev) => ({
        ...prev,
        totalTimeLeft: Math.max(0, prev.totalTimeLeft - 1),
      }));
    }, 1000);

    return () => clearInterval(totalTimer);
  }, []);

  // Question timer handler
  useEffect(() => {
    if (progress.currentIndex >= questions.questions.length) return;

    const questionTimer = setInterval(() => {
      setProgress((prev) => ({
        ...prev,
        timeLeft: Math.max(0, prev.timeLeft - 1),
      }));
    }, 1000);

    return () => clearInterval(questionTimer);
  }, [progress.currentIndex]);

  // Navigation and timeout handler
  useEffect(() => {
    const shouldEndQuiz =
      progress.currentIndex >= questions.questions.length ||
      progress.totalTimeLeft <= 0;

    if (shouldEndQuiz) {
      router.push(`/result-screen?score=${progress.score}`);
    }
  }, [progress.currentIndex, progress.totalTimeLeft]);

  const handleAnswer = (selectedIndex: number) => {
    const newScore =
      selectedIndex === questions.questions[progress.currentIndex].correctIndex
        ? progress.score + 1
        : progress.score;

    const nextIndex = progress.currentIndex + 1;

    if (nextIndex < questions.questions.length) {
      setProgress((prev) => ({
        ...prev,
        currentIndex: nextIndex,
        score: newScore,
        timeLeft: questions.questions[nextIndex].timeLimit,
      }));
    } else {
      router.push(`/result-screen?score=${newScore}`);
    }
  };

  if (questions.questions.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">No questions available!</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ProgressBar
        progress={progress.currentIndex / questions.questions.length}
      />

      <ThemedText type="subtitle" style={styles.questionCount}>
        Question {progress.currentIndex + 1}/{questions.questions.length}
      </ThemedText>

      <Timer timeLeft={Math.min(progress.timeLeft, progress.totalTimeLeft)} />

      {progress.currentIndex < questions.questions.length && (
        <Question
          question={questions.questions[progress.currentIndex]}
          onSelect={handleAnswer}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 20,
    paddingHorizontal: 20,
    paddingTop: 50
  },
  questionCount: {
    marginBottom: 15,
    fontSize: 18,
  },
});
