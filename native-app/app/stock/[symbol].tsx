import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { Colors, Spacing, FontSize, BorderRadius, Shadows } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const mockStockData: Record<string, any> = {
  'AAPL': { name: 'Apple Inc.', price: 189.84, change: 2.34, changePercent: 1.25, high: 191.50, low: 187.20, open: 188.00, volume: '52.3M', marketCap: '2.95T', pe: 29.5, score: 3 },
  'MSFT': { name: 'Microsoft', price: 378.91, change: -1.23, changePercent: -0.32, high: 381.00, low: 376.50, open: 380.00, volume: '18.2M', marketCap: '2.81T', pe: 35.2, score: -1 },
  'NVDA': { name: 'NVIDIA', price: 495.22, change: 12.45, changePercent: 2.58, high: 498.00, low: 480.00, open: 482.00, volume: '45.6M', marketCap: '1.22T', pe: 65.8, score: 5 },
  'BTC-USD': { name: 'Bitcoin', price: 67234.50, change: 1250.00, changePercent: 1.89, high: 68500.00, low: 65800.00, open: 66000.00, volume: '28.5B', marketCap: '1.32T', pe: null, score: 4 },
};

const technicalIndicators = [
  { name: 'RSI (14)', value: 58.3, signal: 'Neutral', color: Colors.dark.textMuted },
  { name: 'MACD', value: 2.45, signal: 'Bullish', color: Colors.dark.bullish },
  { name: 'SMA 20', value: 185.50, signal: 'Above', color: Colors.dark.bullish },
  { name: 'SMA 50', value: 178.20, signal: 'Above', color: Colors.dark.bullish },
  { name: 'SMA 200', value: 165.80, signal: 'Above', color: Colors.dark.bullish },
  { name: 'ATR', value: 4.25, signal: 'Normal', color: Colors.dark.textMuted },
];

const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

export default function StockDetailScreen() {
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  
  const stock = mockStockData[symbol || 'AAPL'] || mockStockData['AAPL'];
  const isBullish = stock.change >= 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.symbol}>{symbol}</Text>
          <Text style={styles.name}>{stock.name}</Text>
        </View>
        <View style={[styles.scoreBadge, { backgroundColor: isBullish ? Colors.dark.bullish : Colors.dark.bearish }]}>
          <Text style={styles.scoreText}>{stock.score >= 0 ? '+' : ''}{stock.score}</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.priceCard}>
          <Text style={styles.price}>
            ${stock.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Text>
          <View style={[styles.changeBadge, { backgroundColor: isBullish ? Colors.dark.bullishSoft : Colors.dark.bearishSoft }]}>
            <Text style={[styles.changeText, { color: isBullish ? Colors.dark.bullish : Colors.dark.bearish }]}>
              {isBullish ? '↑' : '↓'} ${Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
            </Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.chartPlaceholder}>
            <View style={styles.chartLine}>
              {[...Array(20)].map((_, i) => (
                <View 
                  key={i} 
                  style={[
                    styles.chartBar, 
                    { 
                      height: 20 + Math.random() * 80,
                      backgroundColor: isBullish ? Colors.dark.bullish : Colors.dark.bearish,
                      opacity: 0.3 + (i / 20) * 0.7
                    }
                  ]} 
                />
              ))}
            </View>
            <Text style={styles.chartLabel}>Price Chart</Text>
          </View>
          
          <View style={styles.timeframeRow}>
            {timeframes.map((tf) => (
              <TouchableOpacity
                key={tf}
                style={[styles.timeframeButton, selectedTimeframe === tf && styles.timeframeButtonActive]}
                onPress={() => setSelectedTimeframe(tf)}
              >
                <Text style={[styles.timeframeText, selectedTimeframe === tf && styles.timeframeTextActive]}>
                  {tf}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Open</Text>
            <Text style={styles.statValue}>${stock.open.toLocaleString()}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>High</Text>
            <Text style={[styles.statValue, { color: Colors.dark.bullish }]}>${stock.high.toLocaleString()}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Low</Text>
            <Text style={[styles.statValue, { color: Colors.dark.bearish }]}>${stock.low.toLocaleString()}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Volume</Text>
            <Text style={styles.statValue}>{stock.volume}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Mkt Cap</Text>
            <Text style={styles.statValue}>${stock.marketCap}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>P/E</Text>
            <Text style={styles.statValue}>{stock.pe || 'N/A'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Indicators</Text>
          <View style={styles.indicatorsCard}>
            {technicalIndicators.map((indicator, index) => (
              <View key={indicator.name} style={[styles.indicatorRow, index < technicalIndicators.length - 1 && styles.indicatorBorder]}>
                <Text style={styles.indicatorName}>{indicator.name}</Text>
                <View style={styles.indicatorRight}>
                  <Text style={styles.indicatorValue}>{indicator.value}</Text>
                  <View style={[styles.signalBadge, { backgroundColor: indicator.color === Colors.dark.bullish ? Colors.dark.greenSoft : 'rgba(156, 163, 175, 0.15)' }]}>
                    <Text style={[styles.signalText, { color: indicator.color }]}>{indicator.signal}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.alertButton}>
            <Text style={styles.alertButtonText}>🔔 Set Alert</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tradeButton}>
            <Text style={styles.tradeButtonText}>📝 Log Trade</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    paddingTop: Spacing.xl + 20,
    backgroundColor: Colors.dark.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  backButton: {
    padding: Spacing.sm,
  },
  backText: {
    fontSize: FontSize.md,
    color: Colors.dark.accent,
    fontWeight: '500',
  },
  headerTitle: {
    alignItems: 'center',
    flex: 1,
  },
  symbol: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  name: {
    fontSize: FontSize.sm,
    color: Colors.dark.textMuted,
  },
  scoreBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: '#0b1120',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
  },
  priceCard: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  price: {
    fontSize: 42,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: Spacing.sm,
  },
  changeBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  changeText: {
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  chartContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    ...Shadows.soft,
  },
  chartPlaceholder: {
    height: 180,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  chartLine: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    height: 150,
    paddingHorizontal: Spacing.sm,
  },
  chartBar: {
    width: (width - 80) / 22,
    borderRadius: 2,
  },
  chartLabel: {
    fontSize: FontSize.xs,
    color: Colors.dark.textMuted,
    marginTop: Spacing.sm,
  },
  timeframeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.xs,
  },
  timeframeButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: BorderRadius.sm,
    backgroundColor: 'transparent',
  },
  timeframeButtonActive: {
    backgroundColor: Colors.dark.accent,
  },
  timeframeText: {
    fontSize: FontSize.sm,
    fontWeight: '500',
    color: Colors.dark.textMuted,
  },
  timeframeTextActive: {
    color: '#0b1120',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    ...Shadows.small,
  },
  statItem: {
    width: '33.33%',
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.dark.textMuted,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: Spacing.sm,
  },
  indicatorsCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    overflow: 'hidden',
    ...Shadows.small,
  },
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  indicatorBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.85)',
  },
  indicatorName: {
    fontSize: FontSize.md,
    color: Colors.dark.text,
  },
  indicatorRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  indicatorValue: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.dark.text,
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
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xxl,
  },
  alertButton: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.full,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  alertButtonText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  tradeButton: {
    flex: 1,
    backgroundColor: Colors.dark.accent,
    borderRadius: BorderRadius.full,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.small,
  },
  tradeButtonText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: '#0b1120',
  },
});
