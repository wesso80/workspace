import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useState, useMemo } from 'react';
import { router } from 'expo-router';

const COLORS = {
  background: '#05070b',
  card: '#111624',
  accent: '#14b8a6',
  green: '#22c55e',
  text: '#f9fafb',
  textMuted: '#9ca3af',
  border: '#1f2933',
  warning: '#f59e0b',
  secondary: '#6366f1',
};

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
      case 'crypto': return COLORS.accent;
      case 'commodity': return COLORS.warning;
      default: return COLORS.secondary;
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
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search stocks, crypto, commodities..."
            placeholderTextColor={COLORS.textMuted}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="characters"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.clearButton}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
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
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, paddingTop: 60, backgroundColor: COLORS.card, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  backButton: { padding: 8, width: 60 },
  backText: { fontSize: 15, color: COLORS.accent, fontWeight: '500' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  searchContainer: { padding: 16, backgroundColor: COLORS.background },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 18, paddingHorizontal: 16, borderWidth: 1, borderColor: COLORS.border },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 14, fontSize: 15, color: COLORS.text },
  clearButton: { fontSize: 16, color: COLORS.textMuted, padding: 4 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16, paddingTop: 0 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: COLORS.card, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: COLORS.border },
  chipText: { fontSize: 13, color: COLORS.text, fontWeight: '500' },
  resultItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.card, borderRadius: 18, padding: 16, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  resultLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  resultIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  resultIconText: { fontSize: 16, fontWeight: '700' },
  resultSymbol: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  resultName: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  typeText: { fontSize: 11, fontWeight: '600' },
  arrowText: { fontSize: 16, color: COLORS.textMuted },
  emptyState: { alignItems: 'center', paddingVertical: 48 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 4 },
  emptyText: { fontSize: 13, color: COLORS.textMuted },
});
