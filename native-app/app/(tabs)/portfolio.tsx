import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';

const COLORS = {
  background: '#05070b',
  card: '#111624',
  green: '#22c55e',
  greenSoft: 'rgba(34, 197, 94, 0.12)',
  greenText: '#bbf7d0',
  greenBorder: 'rgba(34, 197, 94, 0.7)',
  text: '#f9fafb',
  textMuted: '#9ca3af',
  border: '#1f2933',
  bullish: '#22c55e',
  bullishSoft: 'rgba(34, 197, 94, 0.12)',
  bearish: '#ef4444',
  bearishSoft: 'rgba(239, 68, 68, 0.12)',
};

const mockPortfolio = [
  { symbol: 'AAPL', shares: 50, avgCost: 150.00, currentPrice: 189.84 },
  { symbol: 'MSFT', shares: 25, avgCost: 320.00, currentPrice: 378.91 },
  { symbol: 'NVDA', shares: 10, avgCost: 400.00, currentPrice: 495.22 },
  { symbol: 'BTC-USD', shares: 0.5, avgCost: 45000.00, currentPrice: 67234.50 },
];

export default function PortfolioScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const totalValue = mockPortfolio.reduce((acc, p) => acc + (p.shares * p.currentPrice), 0);
  const totalCost = mockPortfolio.reduce((acc, p) => acc + (p.shares * p.avgCost), 0);
  const totalPL = totalValue - totalCost;
  const totalPLPercent = ((totalValue - totalCost) / totalCost) * 100;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.green} />
        }
      >
        <View style={styles.totalCard}>
          <View style={styles.totalHeader}>
            <Text style={styles.totalLabel}>Total Portfolio Value</Text>
            <View style={styles.includedBadge}>
              <Text style={styles.includedText}>Included</Text>
            </View>
          </View>
          <Text style={styles.totalValue}>${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
          <View style={styles.plRow}>
            <Text style={[styles.plValue, { color: totalPL >= 0 ? COLORS.bullish : COLORS.bearish }]}>
              {totalPL >= 0 ? '+' : ''}${Math.abs(totalPL).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
            <View style={[styles.plBadge, { backgroundColor: totalPL >= 0 ? COLORS.bullishSoft : COLORS.bearishSoft }]}>
              <Text style={[styles.plPercent, { color: totalPL >= 0 ? COLORS.bullish : COLORS.bearish }]}>
                {totalPL >= 0 ? '↑' : '↓'} {Math.abs(totalPLPercent).toFixed(2)}%
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Holdings</Text>
          <Text style={styles.sectionCount}>{mockPortfolio.length} positions</Text>
        </View>

        {mockPortfolio.map((holding) => {
          const value = holding.shares * holding.currentPrice;
          const cost = holding.shares * holding.avgCost;
          const pl = value - cost;
          const plPercent = ((value - cost) / cost) * 100;
          const isBullish = pl >= 0;

          return (
            <TouchableOpacity key={holding.symbol} style={styles.holdingCard} activeOpacity={0.7}>
              <View style={styles.holdingLeft}>
                <View style={[styles.holdingIcon, { backgroundColor: isBullish ? COLORS.bullishSoft : COLORS.bearishSoft }]}>
                  <Text style={[styles.holdingIconText, { color: isBullish ? COLORS.bullish : COLORS.bearish }]}>
                    {holding.symbol.charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.holdingSymbol}>{holding.symbol}</Text>
                  <Text style={styles.holdingShares}>{holding.shares} shares @ ${holding.avgCost.toFixed(2)}</Text>
                </View>
              </View>
              <View style={styles.holdingRight}>
                <Text style={styles.holdingValue}>${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
                <View style={[styles.holdingPLBadge, { backgroundColor: isBullish ? COLORS.bullishSoft : COLORS.bearishSoft }]}>
                  <Text style={[styles.holdingPL, { color: isBullish ? COLORS.bullish : COLORS.bearish }]}>
                    {isBullish ? '↑' : '↓'} {Math.abs(plPercent).toFixed(2)}%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
          <Text style={styles.addButtonText}>+ Add Position</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16 },
  totalCard: { backgroundColor: COLORS.card, borderRadius: 18, padding: 24, borderWidth: 1, borderColor: COLORS.border, marginBottom: 24 },
  totalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  totalLabel: { fontSize: 13, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  includedBadge: { backgroundColor: COLORS.greenSoft, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, borderWidth: 1, borderColor: COLORS.greenBorder },
  includedText: { fontSize: 11, fontWeight: '600', color: COLORS.greenText },
  totalValue: { fontSize: 36, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  plRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  plValue: { fontSize: 16, fontWeight: '600' },
  plBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  plPercent: { fontSize: 13, fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  sectionCount: { fontSize: 13, color: COLORS.textMuted },
  holdingCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 18, padding: 16, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  holdingLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  holdingIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  holdingIconText: { fontSize: 16, fontWeight: '700' },
  holdingSymbol: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  holdingShares: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  holdingRight: { alignItems: 'flex-end', gap: 4 },
  holdingValue: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  holdingPLBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  holdingPL: { fontSize: 11, fontWeight: '600' },
  addButton: { backgroundColor: '#14b8a6', borderRadius: 999, padding: 16, alignItems: 'center', marginTop: 8 },
  addButtonText: { color: '#0b1120', fontSize: 15, fontWeight: '600' },
});
