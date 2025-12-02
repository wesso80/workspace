import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useMemo } from 'react';
import { router } from 'expo-router';
import { Colors, Spacing, FontSize, BorderRadius, Shadows } from '@/constants/Colors';
import { SearchBar } from '@/components/SearchBar';

const allSymbols = [
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'equity' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'equity' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'equity' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'equity' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'equity' },
  { symbol: 'META', name: 'Meta Platforms Inc.', type: 'equity' },
  { symbol: 'TSLA', name: 'Tesla Inc.', type: 'equity' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', type: 'equity' },
  { symbol: 'NFLX', name: 'Netflix Inc.', type: 'equity' },
  { symbol: 'INTC', name: 'Intel Corporation', type: 'equity' },
  { symbol: 'BTC-USD', name: 'Bitcoin', type: 'crypto' },
  { symbol: 'ETH-USD', name: 'Ethereum', type: 'crypto' },
  { symbol: 'SOL-USD', name: 'Solana', type: 'crypto' },
  { symbol: 'XRP-USD', name: 'XRP', type: 'crypto' },
  { symbol: 'ADA-USD', name: 'Cardano', type: 'crypto' },
  { symbol: 'DOGE-USD', name: 'Dogecoin', type: 'crypto' },
  { symbol: 'GC=F', name: 'Gold Futures', type: 'commodity' },
  { symbol: 'SI=F', name: 'Silver Futures', type: 'commodity' },
  { symbol: 'CL=F', name: 'Crude Oil Futures', type: 'commodity' },
];

const recentSearches = ['AAPL', 'BTC-USD', 'NVDA'];
const popularSymbols = ['AAPL', 'MSFT', 'NVDA', 'BTC-USD', 'ETH-USD'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  const filteredSymbols = useMemo(() => {
    if (!query) return [];
    const q = query.toUpperCase();
    return allSymbols.filter(
      s => s.symbol.includes(q) || s.name.toUpperCase().includes(q)
    ).slice(0, 10);
  }, [query]);

  const handleSelect = (symbol: string) => {
    router.push(`/stock/${symbol}`);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'crypto': return Colors.dark.accent;
      case 'commodity': return Colors.dark.warning;
      default: return Colors.dark.secondary;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClear={() => setQuery('')}
          placeholder="Search stocks, crypto, commodities..."
        />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {query.length > 0 ? (
          <>
            {filteredSymbols.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Results</Text>
                {filteredSymbols.map((item) => (
                  <TouchableOpacity
                    key={item.symbol}
                    style={styles.resultItem}
                    onPress={() => handleSelect(item.symbol)}
                  >
                    <View style={styles.resultLeft}>
                      <View style={[styles.resultIcon, { backgroundColor: `${getTypeColor(item.type)}20` }]}>
                        <Text style={[styles.resultIconText, { color: getTypeColor(item.type) }]}>
                          {item.symbol.charAt(0)}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.resultSymbol}>{item.symbol}</Text>
                        <Text style={styles.resultName}>{item.name}</Text>
                      </View>
                    </View>
                    <View style={[styles.typeBadge, { backgroundColor: `${getTypeColor(item.type)}20` }]}>
                      <Text style={[styles.typeText, { color: getTypeColor(item.type) }]}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={styles.emptyTitle}>No results found</Text>
                <Text style={styles.emptyText}>Try searching for a different symbol or name</Text>
              </View>
            )}
          </>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <View style={styles.chipContainer}>
                {recentSearches.map((symbol) => (
                  <TouchableOpacity
                    key={symbol}
                    style={styles.chip}
                    onPress={() => handleSelect(symbol)}
                  >
                    <Text style={styles.chipText}>{symbol}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular</Text>
              {popularSymbols.map((symbol) => {
                const item = allSymbols.find(s => s.symbol === symbol)!;
                return (
                  <TouchableOpacity
                    key={symbol}
                    style={styles.resultItem}
                    onPress={() => handleSelect(symbol)}
                  >
                    <View style={styles.resultLeft}>
                      <View style={[styles.resultIcon, { backgroundColor: `${getTypeColor(item.type)}20` }]}>
                        <Text style={[styles.resultIconText, { color: getTypeColor(item.type) }]}>
                          {item.symbol.charAt(0)}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.resultSymbol}>{item.symbol}</Text>
                        <Text style={styles.resultName}>{item.name}</Text>
                      </View>
                    </View>
                    <Text style={styles.arrowText}>→</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
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
    width: 60,
  },
  backText: {
    fontSize: FontSize.md,
    color: Colors.dark.accent,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  searchContainer: {
    padding: Spacing.md,
    backgroundColor: Colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingTop: 0,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.dark.textMuted,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    backgroundColor: Colors.dark.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  chipText: {
    fontSize: FontSize.sm,
    color: Colors.dark.text,
    fontWeight: '500',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    ...Shadows.small,
  },
  resultLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultIconText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  resultSymbol: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  resultName: {
    fontSize: FontSize.xs,
    color: Colors.dark.textMuted,
    marginTop: 2,
  },
  typeBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  typeText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  arrowText: {
    fontSize: FontSize.lg,
    color: Colors.dark.textMuted,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: Spacing.xs,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.dark.textMuted,
  },
});
