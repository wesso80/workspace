import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { router } from 'expo-router';

const COLORS = {
  background: '#05070b',
  card: '#111624',
  accent: '#14b8a6',
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
  warning: '#f59e0b',
  warningSoft: 'rgba(245, 158, 11, 0.15)',
  secondary: '#6366f1',
  secondarySoft: 'rgba(99, 102, 241, 0.15)',
};

const mockTrades = [
  { id: 1, symbol: 'AAPL', type: 'BUY', tradeType: 'Spot', shares: 10, entryPrice: 185.00, date: '2024-11-25', pnl: 75.00, status: 'closed' },
  { id: 2, symbol: 'NVDA', type: 'BUY', tradeType: 'Options', shares: 5, entryPrice: 480.00, date: '2024-11-26', pnl: null, status: 'open' },
  { id: 3, symbol: 'TSLA', type: 'SELL', tradeType: 'Spot', shares: 20, entryPrice: 245.00, date: '2024-11-24', pnl: 140.00, status: 'closed' },
  { id: 4, symbol: 'BTC-USD', type: 'BUY', tradeType: 'Spot', shares: 0.1, entryPrice: 65000.00, date: '2024-11-26', pnl: null, status: 'open' },
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.green} />
        }
      >
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total P&L</Text>
            <Text style={[styles.statValue, { color: totalPnL >= 0 ? COLORS.bullish : COLORS.bearish }]}>
              {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Win Rate</Text>
            <Text style={[styles.statValue, { color: COLORS.accent }]}>{winRate.toFixed(0)}%</Text>
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
                  <View style={[styles.tradeIcon, { backgroundColor: trade.type === 'BUY' ? COLORS.bullishSoft : COLORS.bearishSoft }]}>
                    <Text style={[styles.tradeIconText, { color: trade.type === 'BUY' ? COLORS.bullish : COLORS.bearish }]}>
                      {trade.symbol.charAt(0)}
                    </Text>
                  </View>
                  <View>
                    <View style={styles.tradeSymbolRow}>
                      <Text style={styles.tradeSymbol}>{trade.symbol}</Text>
                      <View style={[styles.typeBadge, { backgroundColor: trade.type === 'BUY' ? COLORS.bullishSoft : COLORS.bearishSoft }]}>
                        <Text style={[styles.typeText, { color: trade.type === 'BUY' ? COLORS.bullish : COLORS.bearish }]}>
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
                    backgroundColor: isBullish ? COLORS.greenSoft : COLORS.bearishSoft,
                    borderWidth: 1,
                    borderColor: isBullish ? COLORS.greenBorder : 'rgba(239, 68, 68, 0.5)'
                  }]}>
                    <Text style={[styles.pnlValue, { color: isBullish ? COLORS.greenText : '#fca5a5' }]}>
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
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: COLORS.card, borderRadius: 18, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  statLabel: { fontSize: 11, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  filterButton: { flex: 1, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 999, backgroundColor: COLORS.card, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  filterButtonActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  filterText: { fontSize: 13, color: COLORS.textMuted, fontWeight: '500' },
  filterTextActive: { color: '#0b1120', fontWeight: '600' },
  tradeCard: { backgroundColor: COLORS.card, borderRadius: 18, padding: 16, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  tradeHeader: { marginBottom: 8 },
  tradeLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tradeIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tradeIconText: { fontSize: 16, fontWeight: '700' },
  tradeSymbolRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  tradeSymbol: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  typeText: { fontSize: 11, fontWeight: '600' },
  tradeTypeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, backgroundColor: COLORS.secondarySoft },
  tradeTypeText: { fontSize: 11, fontWeight: '600', color: COLORS.secondary },
  tradeDetail: { fontSize: 11, color: COLORS.textMuted },
  tradeFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTopWidth: 1, borderTopColor: 'rgba(15, 23, 42, 0.85)' },
  tradeDate: { fontSize: 13, color: COLORS.textMuted },
  openBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: COLORS.warningSoft, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  openDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.warning },
  openText: { fontSize: 11, fontWeight: '600', color: COLORS.warning },
  pnlBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  pnlValue: { fontSize: 13, fontWeight: '600' },
  addButton: { backgroundColor: COLORS.accent, borderRadius: 999, padding: 16, alignItems: 'center', marginTop: 8 },
  addButtonText: { color: '#0b1120', fontSize: 15, fontWeight: '600' },
});
