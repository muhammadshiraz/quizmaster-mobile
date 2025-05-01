import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, TouchableOpacity, Image, Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function StartScreen() {
  const scaleValue = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Animated.View
        style={[styles.logoContainer, { transform: [{ scale: scaleValue }] }]}
      >
        <Image
          source={require("@/assets/images/quiz-logo.png")}
          style={styles.logo}
        />
      </Animated.View>

      <ThemedText type="title" style={styles.title}>
        🏆 Quiz Master
      </ThemedText>

      <ThemedText style={styles.subtitle}>
        Test your knowledge and climb the leaderboard!
      </ThemedText>

      <ThemedView style={styles.decorativeLine} />

      <Link href="/quiz-screen" asChild>
        <TouchableOpacity style={styles.startButton}>
          <ThemedText style={styles.buttonText}>Start Challenge</ThemedText>
          <ThemedText style={styles.buttonSubtext}>
            100+ Questions Waiting
          </ThemedText>
        </TouchableOpacity>
      </Link>

      <ThemedView style={styles.featureContainer}>
        <ThemedView style={styles.featureBadge}>
          <ThemedText style={styles.featureText}>
            🎯 Daily Challenges
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.featureBadge}>
          <ThemedText style={styles.featureText}>
            📈 Progress Tracking
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedText style={styles.footerText}>
        Powered by QuizMaster Pro
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#F8FAFD",
  },
  logoContainer: {
    marginBottom: 30,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 30,
  },
  title: {
    fontSize: 36,
    padding: 25,
    marginBottom: 10,
    fontWeight: "800",
    color: "#2D3436",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: "#636E72",
    textAlign: "center",
    lineHeight: 24,
  },
  decorativeLine: {
    width: "40%",
    height: 4,
    backgroundColor: "#4A90E2",
    borderRadius: 2,
    marginVertical: 20,
    opacity: 0.3,
  },
  startButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  buttonSubtext: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    marginTop: 5,
  },
  featureContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 30,
  },
  featureBadge: {
    backgroundColor: "rgba(74,144,226,0.1)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(74,144,226,0.2)",
  },
  featureText: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "600",
  },
  footerText: {
    position: "absolute",
    bottom: 30,
    color: "#B2BEC3",
    fontSize: 12,
    fontWeight: "500",
  },
});
