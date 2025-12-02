import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { Colors, Spacing, FontSize, BorderRadius, Shadows } from '@/constants/Colors';

const mockTrades = [
  { id: 1, symbol: 'AAPL', type: 'BUY', tradeType: 'Spot', shares: 10, entryPrice: 185.00, exitPrice: 192.50, date: '2024-11-25', pnl: 75.00, status: 'closed' },
  { id: 2, symbol: 'NVDA', type: 'BUY', tradeType: 'Options', shares: 5, entryPrice: 480.00, exitPrice: null, date: '2024-11-26', pnl: null, status: 'open' },
  { id: 3, symbol: 'TSLA', type: 'SELL', tradeType: 'Spot', shares: 20, entryPrice: 245.00, exitPrice: 238.00, date: '2024-11-24', pnl: 140.00, status: 'closed' },
  { id: 4, symbol: 'BTC-USD', type: 'BUY', tradeType: 'Spot', shares: 0.1, entryPrice: 65000.00, exitPrice: null, date: '2024-11-26', pnl: null, status: 'open' },
];

export default function JournalScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const filteredTrades = filter === 'all' ? mockTrades : mockTrades.filter(t => t.status === filter);
  const totalPnL = mockTrades.filter(t => t.pnl !== null).reduce((acc, t) => acc + (t.pnl || 0), 0);
  const closedTrades = mockTrades.filter(t => t.status === 'closed');
  const winRate = closedTrades.length > 0
    ? (mockTrades.filter(t => t.pnl !== null && t.pnl > 0).length / closedTrades.length) * 100
    : 0;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.dark.green} />
        }
      >
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total P&L</Text>
            <Text style={[styles.statValue, { color: totalPnL >= 0 ? Colors.dark.bullish : Colors.dark.bearish }]}>
              {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Win Rate</Text>
            <Text style={[styles.statValue, { color: Colors.dark.accent }]}>{winRate.toFixed(0)}%</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Trades</Text>
            <Text style={styles.statValue}>{mockTrades.length}</Text>
          </View>
        </View>

        <View style={styles.filterRow}>
          {(['all', 'open', 'closed'] as const).map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterButton, filter === f && styles.filterButtonActive]}
              onPress={() => setFilter(f)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredTrades.map((trade) => {
          const isOpen = trade.status === 'open';
          const isBullish = trade.pnl !== null && trade.pnl >= 0;

          return (
            <TouchableOpacity key={trade.id} style={styles.tradeCard} activeOpacity={0.7}>
              <View style={styles.tradeHeader}>
                <View style={styles.tradeLeft}>
                  <View style={[styles.tradeIcon, { backgroundColor: trade.type === 'BUY' ? Colors.dark.bullishSoft : Colors.dark.bearishSoft }]}>
                    <Text style={[styles.tradeIconText, { color: trade.type === 'BUY' ? Colors.dark.bullish : Colors.dark.bearish }]}>
                      {trade.symbol.charAt(0)}
                    </Text>
                  </View>
                  <View>
                    <View style={styles.tradeSymbolRow}>
                      <Text style={styles.tradeSymbol}>{trade.symbol}</Text>
                      <View style={[styles.typeBadge, { backgroundColor: trade.type === 'BUY' ? Colors.dark.bullishSoft : Colors.dark.bearishSoft }]}>
                        <Text style={[styles.typeText, { color: trade.type === 'BUY' ? Colors.dark.bullish : Colors.dark.bearish }]}>
                          {trade.type}
                        </Text>
                      </View>
                      <View style={styles.tradeTypeBadge}>
                        <Text style={styles.tradeTypeText}>{trade.tradeType}</Text>
                      </View>
                    </View>
                    <Text style={styles.tradeDetail}>{trade.shares} shares @ ${trade.entryPrice.toFixed(2)}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.tradeFooter}>
                <Text style={styles.tradeDate}>{trade.date}</Text>
                {isOpen ? (
                  <View style={styles.openBadge}>
                    <View style={styles.openDot} />
                    <Text style={styles.openText}>OPEN</Text>
                  </View>
                ) : (
                  <View style={[styles.pnlBadge, { 
                    backgroundColor: isBullish ? Colors.dark.greenSoft : Colors.dark.bearishSoft,
                    borderWidth: 1,
                    borderColor: isBullish ? Colors.dark.greenBorder : 'rgba(239, 68, 68, 0.5)'
                  }]}>
                    <Text style={[styles.pnlValue, { color: isBullish ? Colors.dark.greenText : '#fca5a5' }]}>
                      {trade.pnl! >= 0 ? '+' : ''}${trade.pnl!.toFixed(2)}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={() => router.push('/add-trade')}>
          <Text style={styles.addButtonText}>+ Log Trade</Text>
        </TouchableOpacity>
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
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
    ...Shadows.small,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.dark.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
  },
  statValue: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  filterRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  filterButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.dark.card,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  filterButtonActive: {
    backgroundColor: Colors.dark.accent,
    borderColor: Colors.dark.accent,
  },
  filterText: {
    fontSize: FontSize.sm,
    color: Colors.dark.textMuted,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#0b1120',
    fontWeight: '600',
  },
  tradeCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    ...Shadows.small,
  },
  tradeHeader: {
    marginBottom: Spacing.sm,
  },
  tradeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  tradeIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tradeIconText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  tradeSymbolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: 2,
  },
  tradeSymbol: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  typeBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  typeText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  tradeTypeBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.dark.secondarySoft,
  },
  tradeTypeText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.dark.secondary,
  },
  tradeDetail: {
    fontSize: FontSize.xs,
    color: Colors.dark.textMuted,
  },
  tradeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.85)',
  },
  tradeDate: {
    fontSize: FontSize.sm,
    color: Colors.dark.textMuted,
  },
  openBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.dark.warningSoft,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  openDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.dark.warning,
  },
  openText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.dark.warning,
  },
  pnlBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  pnlValue: {
    fontSize: FontSize.sm,
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
});
