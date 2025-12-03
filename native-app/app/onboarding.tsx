import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const COLORS = {
  background: '#05070b',
  card: '#111624',
  accent: '#14b8a6',
  green: '#22c55e',
  greenSoft: 'rgba(34, 197, 94, 0.12)',
  greenText: '#bbf7d0',
  text: '#f9fafb',
  textMuted: '#9ca3af',
  border: '#1f2933',
  badgeBg: 'rgba(15, 23, 42, 0.9)',
  borderSubtle: 'rgba(148, 163, 184, 0.25)',
};

const slides = [
  {
    id: 1,
    emoji: '📊',
    title: 'Find Breakouts Before They Happen',
    description: 'Scan crypto & stocks across timeframes in seconds. Get squeeze detection, confluence scoring, and alert hooks.',
    highlight: 'Breakouts',
  },
  {
    id: 2,
    emoji: '⚡',
    title: 'Multi-Timeframe Analysis',
    description: 'Analyze any asset across 1D, 1W, 1M and more. See technical indicators and confluence scores at a glance.',
    highlight: 'Multi-Timeframe',
  },
  {
    id: 3,
    emoji: '📈',
    title: 'Track Your Portfolio',
    description: 'Monitor your holdings in real-time. See P&L, allocation, and performance metrics all in one place.',
    highlight: 'Portfolio',
  },
  {
    id: 4,
    emoji: '📝',
    title: 'Trade Journal & Alerts',
    description: 'Log your trades, set price alerts, and learn from your trading history. All completely free.',
    highlight: 'Free',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const currentSlide = slides[currentIndex];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{currentSlide.emoji}</Text>
        </View>

        <Text style={styles.title}>
          {currentSlide.title.split(currentSlide.highlight).map((part, i, arr) => (
            <Text key={i}>
              {part}
              {i < arr.length - 1 && (
                <Text style={styles.highlight}>{currentSlide.highlight}</Text>
              )}
            </Text>
          ))}
        </Text>

        <Text style={styles.description}>{currentSlide.description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentIndex && styles.dotActive]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>

        <View style={styles.freeBadge}>
          <View style={styles.freeTag}>
            <Text style={styles.freeTagText}>100% Free</Text>
          </View>
          <Text style={styles.freeSubtext}>No credit card required</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  skipButton: { position: 'absolute', top: 60, right: 16, padding: 8, zIndex: 10 },
  skipText: { fontSize: 15, color: COLORS.textMuted, fontWeight: '500' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  emojiContainer: { width: 120, height: 120, borderRadius: 60, backgroundColor: COLORS.card, alignItems: 'center', justifyContent: 'center', marginBottom: 32, borderWidth: 1, borderColor: COLORS.border },
  emoji: { fontSize: 56 },
  title: { fontSize: 28, fontWeight: '700', color: COLORS.text, textAlign: 'center', marginBottom: 16, lineHeight: 36 },
  highlight: { color: COLORS.green },
  description: { fontSize: 15, color: COLORS.textMuted, textAlign: 'center', lineHeight: 24, maxWidth: 320 },
  footer: { paddingHorizontal: 32, paddingBottom: 60, alignItems: 'center' },
  pagination: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.border },
  dotActive: { width: 24, backgroundColor: COLORS.accent },
  nextButton: { backgroundColor: COLORS.accent, paddingVertical: 16, paddingHorizontal: 48, borderRadius: 999, width: '100%', alignItems: 'center', marginBottom: 24 },
  nextButtonText: { fontSize: 16, fontWeight: '600', color: '#0b1120' },
  freeBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: COLORS.badgeBg, padding: 4, paddingRight: 12, borderRadius: 999, borderWidth: 1, borderColor: COLORS.borderSubtle },
  freeTag: { backgroundColor: COLORS.greenSoft, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  freeTagText: { fontSize: 11, fontWeight: '600', color: COLORS.greenText },
  freeSubtext: { fontSize: 11, color: COLORS.textMuted },
});
