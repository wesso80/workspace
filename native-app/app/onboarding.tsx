import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useState, useRef } from 'react';
import { router } from 'expo-router';
import { Colors, Spacing, FontSize, BorderRadius, Shadows } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

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
              style={[
                styles.dot,
                index === currentIndex && styles.dotActive,
              ]}
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
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  skipButton: {
    position: 'absolute',
    top: Spacing.xl + 20,
    right: Spacing.md,
    padding: Spacing.sm,
    zIndex: 10,
  },
  skipText: {
    fontSize: FontSize.md,
    color: Colors.dark.textMuted,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emojiContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.dark.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    ...Shadows.soft,
  },
  emoji: {
    fontSize: 56,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: 36,
  },
  highlight: {
    color: Colors.dark.green,
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.dark.textMuted,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl + 20,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.dark.accent,
  },
  nextButton: {
    backgroundColor: Colors.dark.accent,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    borderRadius: BorderRadius.full,
    width: '100%',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.small,
  },
  nextButtonText: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: '#0b1120',
  },
  freeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.dark.badgeBg,
    padding: 4,
    paddingRight: 12,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.dark.borderSubtle,
  },
  freeTag: {
    backgroundColor: Colors.dark.greenSoft,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  freeTagText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.dark.greenText,
  },
  freeSubtext: {
    fontSize: FontSize.xs,
    color: Colors.dark.textMuted,
  },
});
