import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

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

const tradeTypes = ['Spot', 'Options', 'Futures', 'Margin'];
const sides = ['BUY', 'SELL'];

export default function AddTradeScreen() {
  const [symbol, setSymbol] = useState('');
  const [side, setSide] = useState(0);
  const [tradeType, setTradeType] = useState(0);
  const [shares, setShares] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [notes, setNotes] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleSave = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log Trade</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.label}>Symbol</Text>
          <View style={styles.symbolRow}>
            <TextInput
              style={styles.symbolInput}
              placeholder="e.g. AAPL, BTC-USD"
              placeholderTextColor={COLORS.textMuted}
              value={symbol}
              onChangeText={setSymbol}
              autoCapitalize="characters"
              autoCorrect={false}
            />
            <TouchableOpacity style={styles.searchButton} onPress={() => router.push('/search')}>
              <Text style={styles.searchIcon}>🔍</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Side</Text>
          <View style={styles.sideRow}>
            {sides.map((s, index) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.sideButton,
                  side === index && (index === 0 ? styles.buyActive : styles.sellActive),
                ]}
                onPress={() => setSide(index)}
              >
                <Text style={[styles.sideText, side === index && styles.sideTextActive]}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Trade Type</Text>
          <View style={styles.segmentContainer}>
            {tradeTypes.map((type, index) => (
              <TouchableOpacity
                key={type}
                style={[styles.segment, tradeType === index && styles.segmentActive]}
                onPress={() => setTradeType(index)}
              >
                <Text style={[styles.segmentText, tradeType === index && styles.segmentTextActive]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.section, { flex: 1 }]}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor={COLORS.textMuted}
              value={shares}
              onChangeText={setShares}
              keyboardType="decimal-pad"
            />
          </View>
          <View style={[styles.section, { flex: 1 }]}>
            <Text style={styles.label}>Entry Price</Text>
            <View style={styles.priceInput}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.priceInputField}
                placeholder="0.00"
                placeholderTextColor={COLORS.textMuted}
                value={entryPrice}
                onChangeText={setEntryPrice}
                keyboardType="decimal-pad"
              />
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.section, { flex: 1 }]}>
            <Text style={styles.label}>Stop Loss</Text>
            <View style={styles.priceInput}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.priceInputField}
                placeholder="0.00"
                placeholderTextColor={COLORS.textMuted}
                value={stopLoss}
                onChangeText={setStopLoss}
                keyboardType="decimal-pad"
              />
            </View>
          </View>
          <View style={[styles.section, { flex: 1 }]}>
            <Text style={styles.label}>Take Profit</Text>
            <View style={styles.priceInput}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.priceInputField}
                placeholder="0.00"
                placeholderTextColor={COLORS.textMuted}
                value={takeProfit}
                onChangeText={setTakeProfit}
                keyboardType="decimal-pad"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.switchRow}>
            <Text style={styles.label}>Trade Status</Text>
            <View style={styles.switchContainer}>
              <Text style={[styles.switchLabel, !isOpen && styles.switchLabelActive]}>Closed</Text>
              <Switch
                value={isOpen}
                onValueChange={setIsOpen}
                trackColor={{ false: COLORS.bearishSoft, true: COLORS.greenSoft }}
                thumbColor={isOpen ? COLORS.green : COLORS.bearish}
              />
              <Text style={[styles.switchLabel, isOpen && styles.switchLabelActive]}>Open</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add any notes about this trade..."
            placeholderTextColor={COLORS.textMuted}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {symbol && shares && entryPrice && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Trade Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Position Size</Text>
              <Text style={styles.summaryValue}>
                ${(parseFloat(shares || '0') * parseFloat(entryPrice || '0')).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Text>
            </View>
            {stopLoss && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Risk</Text>
                <Text style={[styles.summaryValue, { color: COLORS.bearish }]}>
                  ${(parseFloat(shares || '0') * Math.abs(parseFloat(entryPrice || '0') - parseFloat(stopLoss || '0'))).toFixed(2)}
                </Text>
              </View>
            )}
            {takeProfit && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Potential Profit</Text>
                <Text style={[styles.summaryValue, { color: COLORS.bullish }]}>
                  ${(parseFloat(shares || '0') * Math.abs(parseFloat(takeProfit || '0') - parseFloat(entryPrice || '0'))).toFixed(2)}
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, paddingTop: 60, backgroundColor: COLORS.card, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  cancelButton: { padding: 8 },
  cancelText: { fontSize: 15, color: COLORS.textMuted, fontWeight: '500' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  saveButton: { padding: 8 },
  saveText: { fontSize: 15, color: COLORS.accent, fontWeight: '600' },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16 },
  section: { marginBottom: 24 },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  symbolRow: { flexDirection: 'row', gap: 8 },
  symbolInput: { flex: 1, backgroundColor: COLORS.card, borderRadius: 18, padding: 16, fontSize: 16, fontWeight: '600', color: COLORS.text, borderWidth: 1, borderColor: COLORS.border },
  searchButton: { width: 52, height: 52, backgroundColor: COLORS.card, borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border },
  searchIcon: { fontSize: 20 },
  sideRow: { flexDirection: 'row', gap: 8 },
  sideButton: { flex: 1, paddingVertical: 16, borderRadius: 18, alignItems: 'center', backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border },
  buyActive: { backgroundColor: COLORS.bullish, borderColor: COLORS.bullish },
  sellActive: { backgroundColor: COLORS.bearish, borderColor: COLORS.bearish },
  sideText: { fontSize: 15, fontWeight: '600', color: COLORS.textMuted },
  sideTextActive: { color: '#0b1120' },
  segmentContainer: { flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: 18, padding: 4, borderWidth: 1, borderColor: COLORS.border },
  segment: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 14 },
  segmentActive: { backgroundColor: COLORS.accent },
  segmentText: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },
  segmentTextActive: { color: '#0b1120' },
  row: { flexDirection: 'row', gap: 16 },
  input: { backgroundColor: COLORS.card, borderRadius: 18, padding: 16, fontSize: 16, color: COLORS.text, borderWidth: 1, borderColor: COLORS.border },
  priceInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 18, paddingHorizontal: 16, borderWidth: 1, borderColor: COLORS.border },
  currencySymbol: { fontSize: 16, color: COLORS.textMuted, marginRight: 4 },
  priceInputField: { flex: 1, paddingVertical: 16, fontSize: 16, color: COLORS.text },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  switchContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  switchLabel: { fontSize: 13, color: COLORS.textMuted },
  switchLabelActive: { color: COLORS.text, fontWeight: '600' },
  notesInput: { backgroundColor: COLORS.card, borderRadius: 18, padding: 16, fontSize: 15, color: COLORS.text, borderWidth: 1, borderColor: COLORS.border, minHeight: 100 },
  summaryCard: { backgroundColor: COLORS.card, borderRadius: 18, padding: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: 48 },
  summaryTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(15, 23, 42, 0.85)' },
  summaryLabel: { fontSize: 13, color: COLORS.textMuted },
  summaryValue: { fontSize: 15, fontWeight: '600', color: COLORS.text },
});
