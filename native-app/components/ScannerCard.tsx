import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Shadows } from '@/constants/Colors';

interface ScannerCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  score: number;
  signal: 'Bullish' | 'Bearish';
}

export function ScannerCard({ symbol, name, price, change, changePercent, score, signal }: ScannerCardProps) {
  const isBullish = score >= 0;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.leftSection}>
        <View style={styles.symbolContainer}>
          <View style={[styles.symbolIcon, { backgroundColor: isBullish ? Colors.dark.bullishSoft : Colors.dark.bearishSoft }]}>
            <Text style={[styles.symbolIconText, { color: isBullish ? Colors.dark.bullish : Colors.dark.bearish }]}>
              {symbol.charAt(0)}
            </Text>
          </View>
          <View>
            <Text style={styles.symbol}>{symbol}</Text>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.centerSection}>
        <Text style={styles.price}>
          ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
        <View style={[styles.changeBadge, { backgroundColor: change >= 0 ? Colors.dark.bullishSoft : Colors.dark.bearishSoft }]}>
          <Text style={[styles.changeText, { color: change >= 0 ? Colors.dark.bullish : Colors.dark.bearish }]}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(changePercent).toFixed(2)}%
          </Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <View style={[styles.signalBadge, { 
          backgroundColor: isBullish ? Colors.dark.greenSoft : Colors.dark.bearishSoft,
          borderWidth: 1,
          borderColor: isBullish ? Colors.dark.greenBorder : 'rgba(239, 68, 68, 0.5)'
        }]}>
          <Text style={[styles.signalText, { color: isBullish ? Colors.dark.greenText : '#fca5a5' }]}>
            {signal}
          </Text>
        </View>
        <View style={[styles.scoreBadge, { backgroundColor: isBullish ? Colors.dark.bullish : Colors.dark.bearish }]}>
          <Text style={styles.scoreText}>{score >= 0 ? '+' : ''}{score}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    ...Shadows.small,
  },
  leftSection: {
    flex: 1,
  },
  symbolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  symbolIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolIconText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  symbol: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  name: {
    fontSize: FontSize.xs,
    color: Colors.dark.textMuted,
    marginTop: 2,
  },
  centerSection: {
    alignItems: 'flex-end',
    marginRight: Spacing.md,
  },
  price: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  changeBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  changeText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  rightSection: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  signalBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  signalText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  scoreBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: '#0b1120',
  },
});
