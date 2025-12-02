import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { Colors, Spacing, FontSize, BorderRadius, Shadows } from '@/constants/Colors';
import { ScannerCard } from '@/components/ScannerCard';
import { SegmentedControl } from '@/components/SegmentedControl';

type MarketType = 'equities' | 'crypto' | 'commodities';

const mockData = {
  equities: [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 2.34, changePercent: 1.25, score: 3, signal: 'Bullish' as const },
    { symbol: 'MSFT', name: 'Microsoft', price: 378.91, change: -1.23, changePercent: -0.32, score: -1, signal: 'Bearish' as const },
    { symbol: 'NVDA', name: 'NVIDIA', price: 495.22, change: 12.45, changePercent: 2.58, score: 5, signal: 'Bullish' as const },
    { symbol: 'GOOGL', name: 'Alphabet', price: 141.80, change: 0.95, changePercent: 0.67, score: 2, signal: 'Bullish' as const },
    { symbol: 'AMZN', name: 'Amazon', price: 178.25, change: -2.10, changePercent: -1.16, score: -2, signal: 'Bearish' as const },
    { symbol: 'META', name: 'Meta', price: 505.50, change: 8.30, changePercent: 1.67, score: 4, signal: 'Bullish' as const },
  ],
  crypto: [
    { symbol: 'BTC-USD', name: 'Bitcoin', price: 67234.50, change: 1250.00, changePercent: 1.89, score: 4, signal: 'Bullish' as const },
    { symbol: 'ETH-USD', name: 'Ethereum', price: 3456.78, change: -45.20, changePercent: -1.29, score: -1, signal: 'Bearish' as const },
    { symbol: 'SOL-USD', name: 'Solana', price: 148.90, change: 5.60, changePercent: 3.91, score: 5, signal: 'Bullish' as const },
    { symbol: 'XRP-USD', name: 'XRP', price: 0.52, change: 0.02, changePercent: 4.00, score: 3, signal: 'Bullish' as const },
  ],
  commodities: [
    { symbol: 'GC=F', name: 'Gold', price: 2024.30, change: 12.50, changePercent: 0.62, score: 2, signal: 'Bullish' as const },
    { symbol: 'SI=F', name: 'Silver', price: 23.45, change: -0.32, changePercent: -1.35, score: -2, signal: 'Bearish' as const },
    { symbol: 'CL=F', name: 'Crude Oil', price: 78.90, change: 1.20, changePercent: 1.54, score: 3, signal: 'Bullish' as const },
  ],
};

export default function ScannerScreen() {
  const [marketType, setMarketType] = useState<MarketType>('equities');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const data = mockData[marketType];
  const bullishCount = data.filter(d => d.score >= 0).length;
  const bearishCount = data.filter(d => d.score < 0).length;

  const handleCardPress = (symbol: string) => {
    router.push(`/stock/${symbol}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View style={styles.freeBadge}>
            <View style={styles.freeTag}>
              <Text style={styles.freeTagText}>100% Free</Text>
            </View>
            <Text style={styles.freeSubtext}>No credit card required</Text>
          </View>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => router.push('/search')}
          >
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>

        <SegmentedControl
          options={['Equities', 'Crypto', 'Commodities']}
          selectedIndex={['equities', 'crypto', 'commodities'].indexOf(marketType)}
          onSelect={(index) => setMarketType(['equities', 'crypto', 'commodities'][index] as MarketType)}
        />
        
        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Bullish</Text>
            <Text style={[styles.summaryValue, { color: Colors.dark.bullish }]}>{bullishCount}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Bearish</Text>
            <Text style={[styles.summaryValue, { color: Colors.dark.bearish }]}>{bearishCount}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>{data.length}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.dark.green}
          />
        }
      >
        {data.map((item) => (
          <TouchableOpacity key={item.symbol} onPress={() => handleCardPress(item.symbol)} activeOpacity={0.7}>
            <ScannerCard {...item} />
          </TouchableOpacity>
        ))}
        
        <View style={styles.trustedBadge}>
          <Text style={styles.trustedText}>Trusted by 1,000+ traders</Text>
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
    padding: Spacing.md,
    gap: Spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.dark.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  searchIcon: {
    fontSize: 18,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    ...Shadows.soft,
  },
  summaryItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  summaryLabel: {
    fontSize: FontSize.xs,
    color: Colors.dark.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryValue: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingTop: 0,
    gap: Spacing.sm,
  },
  trustedBadge: {
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  trustedText: {
    fontSize: FontSize.xs,
    color: Colors.dark.tealLight,
    backgroundColor: Colors.dark.accentSoft,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.dark.tealBorder,
    overflow: 'hidden',
  },
});
