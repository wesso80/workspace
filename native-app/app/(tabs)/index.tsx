import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { router } from 'expo-router';

const COLORS = {
  background: '#05070b',
  card: '#111624',
  accent: '#14b8a6',
  accentSoft: 'rgba(20, 184, 166, 0.12)',
  green: '#22c55e',
  greenSoft: 'rgba(34, 197, 94, 0.12)',
  greenText: '#bbf7d0',
  greenBorder: 'rgba(34, 197, 94, 0.7)',
  tealLight: '#a5f3fc',
  tealBorder: 'rgba(34, 197, 235, 0.35)',
  text: '#f9fafb',
  textMuted: '#9ca3af',
  border: '#1f2933',
  borderSubtle: 'rgba(148, 163, 184, 0.25)',
  badgeBg: 'rgba(15, 23, 42, 0.9)',
  bullish: '#22c55e',
  bullishSoft: 'rgba(34, 197, 94, 0.12)',
  bearish: '#ef4444',
  bearishSoft: 'rgba(239, 68, 68, 0.12)',
};

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

function ScannerCard({ symbol, name, price, change, changePercent, score, signal }: {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  score: number;
  signal: 'Bullish' | 'Bearish';
}) {
  const isBullish = score >= 0;

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View style={styles.symbolContainer}>
          <View style={[styles.symbolIcon, { backgroundColor: isBullish ? COLORS.bullishSoft : COLORS.bearishSoft }]}>
            <Text style={[styles.symbolIconText, { color: isBullish ? COLORS.bullish : COLORS.bearish }]}>
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
        <View style={[styles.changeBadge, { backgroundColor: change >= 0 ? COLORS.bullishSoft : COLORS.bearishSoft }]}>
          <Text style={[styles.changeText, { color: change >= 0 ? COLORS.bullish : COLORS.bearish }]}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(changePercent).toFixed(2)}%
          </Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <View style={[styles.signalBadge, { 
          backgroundColor: isBullish ? COLORS.greenSoft : COLORS.bearishSoft,
          borderWidth: 1,
          borderColor: isBullish ? COLORS.greenBorder : 'rgba(239, 68, 68, 0.5)'
        }]}>
          <Text style={[styles.signalText, { color: isBullish ? COLORS.greenText : '#fca5a5' }]}>
            {signal}
          </Text>
        </View>
        <View style={[styles.scoreBadge, { backgroundColor: isBullish ? COLORS.bullish : COLORS.bearish }]}>
          <Text style={styles.scoreText}>{score >= 0 ? '+' : ''}{score}</Text>
        </View>
      </View>
    </View>
  );
}

function SegmentedControl({ options, selectedIndex, onSelect }: {
  options: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <View style={styles.segmentContainer}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.segment,
            index === selectedIndex && styles.segmentActive,
          ]}
          onPress={() => onSelect(index)}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.segmentText,
            index === selectedIndex && styles.segmentTextActive,
          ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

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
            <Text style={[styles.summaryValue, { color: COLORS.bullish }]}>{bullishCount}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Bearish</Text>
            <Text style={[styles.summaryValue, { color: COLORS.bearish }]}>{bearishCount}</Text>
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
            tintColor={COLORS.green}
          />
        }
      >
        {data.map((item) => (
          <TouchableOpacity 
            key={item.symbol} 
            onPress={() => router.push(`/stock/${item.symbol}`)} 
            activeOpacity={0.7}
          >
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
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 16,
    gap: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  freeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.badgeBg,
    padding: 4,
    paddingRight: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
  },
  freeTag: {
    backgroundColor: COLORS.greenSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  freeTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.greenText,
  },
  freeSubtext: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    fontSize: 18,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  segmentActive: {
    backgroundColor: COLORS.accent,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  segmentTextActive: {
    color: '#0b1120',
    fontWeight: '600',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryItem: {
    alignItems: 'center',
    gap: 4,
  },
  summaryLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
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
    padding: 16,
    paddingTop: 0,
    gap: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  leftSection: {
    flex: 1,
  },
  symbolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  symbolIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolIconText: {
    fontSize: 16,
    fontWeight: '700',
  },
  symbol: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  name: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  centerSection: {
    alignItems: 'flex-end',
    marginRight: 16,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  changeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  rightSection: {
    alignItems: 'center',
    gap: 4,
  },
  signalBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  signalText: {
    fontSize: 11,
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
    fontSize: 13,
    fontWeight: '700',
    color: '#0b1120',
  },
  trustedBadge: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  trustedText: {
    fontSize: 11,
    color: COLORS.tealLight,
    backgroundColor: COLORS.accentSoft,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.tealBorder,
    overflow: 'hidden',
  },
});
