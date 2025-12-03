import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const COLORS = {
  background: '#05070b',
  card: '#111624',
  accent: '#14b8a6',
  green: '#22c55e',
  greenSoft: 'rgba(34, 197, 94, 0.12)',
  text: '#f9fafb',
  textMuted: '#9ca3af',
  border: '#1f2933',
  bullish: '#22c55e',
  bullishSoft: 'rgba(34, 197, 94, 0.12)',
  bearish: '#ef4444',
  bearishSoft: 'rgba(239, 68, 68, 0.12)',
};

const mockStockData: Record<string, any> = {
  'AAPL': { name: 'Apple Inc.', price: 189.84, change: 2.34, changePercent: 1.25, high: 191.50, low: 187.20, open: 188.00, volume: '52.3M', marketCap: '2.95T', pe: 29.5, score: 3 },
  'MSFT': { name: 'Microsoft', price: 378.91, change: -1.23, changePercent: -0.32, high: 381.00, low: 376.50, open: 380.00, volume: '18.2M', marketCap: '2.81T', pe: 35.2, score: -1 },
  'NVDA': { name: 'NVIDIA', price: 495.22, change: 12.45, changePercent: 2.58, high: 498.00, low: 480.00, open: 482.00, volume: '45.6M', marketCap: '1.22T', pe: 65.8, score: 5 },
  'BTC-USD': { name: 'Bitcoin', price: 67234.50, change: 1250.00, changePercent: 1.89, high: 68500.00, low: 65800.00, open: 66000.00, volume: '28.5B', marketCap: '1.32T', pe: null, score: 4 },
};

const technicalIndicators = [
  { name: 'RSI (14)', value: 58.3, signal: 'Neutral', isBullish: null },
  { name: 'MACD', value: 2.45, signal: 'Bullish', isBullish: true },
  { name: 'SMA 20', value: 185.50, signal: 'Above', isBullish: true },
  { name: 'SMA 50', value: 178.20, signal: 'Above', isBullish: true },
  { name: 'SMA 200', value: 165.80, signal: 'Above', isBullish: true },
  { name: 'ATR', value: 4.25, signal: 'Normal', isBullish: null },
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
        <View style={[styles.scoreBadge, { backgroundColor: isBullish ? COLORS.bullish : COLORS.bearish }]}>
          <Text style={styles.scoreText}>{stock.score >= 0 ? '+' : ''}{stock.score}</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.priceCard}>
          <Text style={styles.price}>
            ${stock.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Text>
          <View style={[styles.changeBadge, { backgroundColor: isBullish ? COLORS.bullishSoft : COLORS.bearishSoft }]}>
            <Text style={[styles.changeText, { color: isBullish ? COLORS.bullish : COLORS.bearish }]}>
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
                      backgroundColor: isBullish ? COLORS.bullish : COLORS.bearish,
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
            <Text style={[styles.statValue, { color: COLORS.bullish }]}>${stock.high.toLocaleString()}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Low</Text>
            <Text style={[styles.statValue, { color: COLORS.bearish }]}>${stock.low.toLocaleString()}</Text>
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
                  <View style={[styles.signalBadge, { backgroundColor: indicator.isBullish === true ? COLORS.greenSoft : 'rgba(156, 163, 175, 0.15)' }]}>
                    <Text style={[styles.signalText, { color: indicator.isBullish === true ? COLORS.bullish : COLORS.textMuted }]}>{indicator.signal}</Text>
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
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, paddingTop: 60, backgroundColor: COLORS.card, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  backButton: { padding: 8 },
  backText: { fontSize: 15, color: COLORS.accent, fontWeight: '500' },
  headerTitle: { alignItems: 'center', flex: 1 },
  symbol: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  name: { fontSize: 13, color: COLORS.textMuted },
  scoreBadge: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  scoreText: { fontSize: 15, fontWeight: '700', color: '#0b1120' },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16 },
  priceCard: { alignItems: 'center', marginBottom: 24 },
  price: { fontSize: 42, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  changeBadge: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999 },
  changeText: { fontSize: 15, fontWeight: '600' },
  chartContainer: { backgroundColor: COLORS.card, borderRadius: 18, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: COLORS.border },
  chartPlaceholder: { height: 180, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 16 },
  chartLine: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', height: 150, paddingHorizontal: 8 },
  chartBar: { width: (width - 80) / 22, borderRadius: 2 },
  chartLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 8 },
  timeframeRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 4 },
  timeframeButton: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8, backgroundColor: 'transparent' },
  timeframeButtonActive: { backgroundColor: COLORS.accent },
  timeframeText: { fontSize: 13, fontWeight: '500', color: COLORS.textMuted },
  timeframeTextActive: { color: '#0b1120', fontWeight: '600' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: COLORS.card, borderRadius: 18, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: COLORS.border },
  statItem: { width: '33.33%', paddingVertical: 8, alignItems: 'center' },
  statLabel: { fontSize: 11, color: COLORS.textMuted, marginBottom: 4, textTransform: 'uppercase' },
  statValue: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  indicatorsCard: { backgroundColor: COLORS.card, borderRadius: 18, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden' },
  indicatorRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  indicatorBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(15, 23, 42, 0.85)' },
  indicatorName: { fontSize: 15, color: COLORS.text },
  indicatorRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  indicatorValue: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  signalBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  signalText: { fontSize: 11, fontWeight: '600' },
  actionButtons: { flexDirection: 'row', gap: 8, marginBottom: 48 },
  alertButton: { flex: 1, backgroundColor: COLORS.card, borderRadius: 999, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  alertButtonText: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  tradeButton: { flex: 1, backgroundColor: COLORS.accent, borderRadius: 999, padding: 16, alignItems: 'center' },
  tradeButtonText: { fontSize: 15, fontWeight: '600', color: '#0b1120' },
});
