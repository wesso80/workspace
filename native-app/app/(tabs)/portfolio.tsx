import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Shadows } from '@/constants/Colors';

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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.dark.green} />
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
            <Text style={[styles.plValue, { color: totalPL >= 0 ? Colors.dark.bullish : Colors.dark.bearish }]}>
              {totalPL >= 0 ? '+' : ''}${Math.abs(totalPL).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
            <View style={[styles.plBadge, { backgroundColor: totalPL >= 0 ? Colors.dark.bullishSoft : Colors.dark.bearishSoft }]}>
              <Text style={[styles.plPercent, { color: totalPL >= 0 ? Colors.dark.bullish : Colors.dark.bearish }]}>
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
                <View style={[styles.holdingIcon, { backgroundColor: isBullish ? Colors.dark.bullishSoft : Colors.dark.bearishSoft }]}>
                  <Text style={[styles.holdingIconText, { color: isBullish ? Colors.dark.bullish : Colors.dark.bearish }]}>
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
                <View style={[styles.holdingPLBadge, { backgroundColor: isBullish ? Colors.dark.bullishSoft : Colors.dark.bearishSoft }]}>
                  <Text style={[styles.holdingPL, { color: isBullish ? Colors.dark.bullish : Colors.dark.bearish }]}>
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

        <View style={styles.proTip}>
          <Text style={styles.proTipTitle}>Pro features available</Text>
          <Text style={styles.proTipText}>Backtesting, advanced charts, and TradingView integration when you're ready to upgrade.</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
  },
  totalCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    marginBottom: Spacing.lg,
    ...Shadows.soft,
  },
  totalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  totalLabel: {
    fontSize: FontSize.sm,
    color: Colors.dark.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  includedBadge: {
    backgroundColor: Colors.dark.greenSoft,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.dark.greenBorder,
  },
  includedText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.dark.greenText,
  },
  totalValue: {
    fontSize: FontSize.xxxl,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: Spacing.sm,
  },
  plRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  plValue: {
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  plBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  plPercent: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  sectionCount: {
    fontSize: FontSize.sm,
    color: Colors.dark.textMuted,
  },
  holdingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    ...Shadows.small,
  },
  holdingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  holdingIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  holdingIconText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  holdingSymbol: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  holdingShares: {
    fontSize: FontSize.xs,
    color: Colors.dark.textMuted,
    marginTop: 2,
  },
  holdingRight: {
    alignItems: 'flex-end',
    gap: Spacing.xs,
  },
  holdingValue: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  holdingPLBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  holdingPL: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: Colors.dark.accent,
    borderRadius: BorderRadius.full,
    padding: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.sm,
    ...Shadows.small,
  },
  addButtonText: {
    color: '#0b1120',
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  proTip: {
    marginTop: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  proTipTitle: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: Spacing.xs,
  },
  proTipText: {
    fontSize: FontSize.sm,
    color: Colors.dark.textMuted,
    lineHeight: 20,
  },
});
