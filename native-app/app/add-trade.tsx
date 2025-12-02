import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Colors, Spacing, FontSize, BorderRadius, Shadows } from '@/constants/Colors';
import { SegmentedControl } from '@/components/SegmentedControl';

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
              placeholderTextColor={Colors.dark.textMuted}
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
                <Text style={[
                  styles.sideText,
                  side === index && styles.sideTextActive,
                ]}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Trade Type</Text>
          <SegmentedControl
            options={tradeTypes}
            selectedIndex={tradeType}
            onSelect={setTradeType}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.section, { flex: 1 }]}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor={Colors.dark.textMuted}
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
                placeholderTextColor={Colors.dark.textMuted}
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
                placeholderTextColor={Colors.dark.textMuted}
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
                placeholderTextColor={Colors.dark.textMuted}
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
                trackColor={{ false: Colors.dark.bearishSoft, true: Colors.dark.greenSoft }}
                thumbColor={isOpen ? Colors.dark.green : Colors.dark.bearish}
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
            placeholderTextColor={Colors.dark.textMuted}
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
                <Text style={[styles.summaryValue, { color: Colors.dark.bearish }]}>
                  ${(parseFloat(shares || '0') * Math.abs(parseFloat(entryPrice || '0') - parseFloat(stopLoss || '0'))).toFixed(2)}
                </Text>
              </View>
            )}
            {takeProfit && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Potential Profit</Text>
                <Text style={[styles.summaryValue, { color: Colors.dark.bullish }]}>
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
  cancelButton: {
    padding: Spacing.sm,
  },
  cancelText: {
    fontSize: FontSize.md,
    color: Colors.dark.textMuted,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  saveButton: {
    padding: Spacing.sm,
  },
  saveText: {
    fontSize: FontSize.md,
    color: Colors.dark.accent,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.dark.textMuted,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  symbolRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  symbolInput: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.dark.text,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  searchButton: {
    width: 52,
    height: 52,
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  searchIcon: {
    fontSize: 20,
  },
  sideRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  sideButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  buyActive: {
    backgroundColor: Colors.dark.bullish,
    borderColor: Colors.dark.bullish,
  },
  sellActive: {
    backgroundColor: Colors.dark.bearish,
    borderColor: Colors.dark.bearish,
  },
  sideText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.dark.textMuted,
  },
  sideTextActive: {
    color: '#0b1120',
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  input: {
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    fontSize: FontSize.lg,
    color: Colors.dark.text,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  currencySymbol: {
    fontSize: FontSize.lg,
    color: Colors.dark.textMuted,
    marginRight: Spacing.xs,
  },
  priceInputField: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: FontSize.lg,
    color: Colors.dark.text,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  switchLabel: {
    fontSize: FontSize.sm,
    color: Colors.dark.textMuted,
  },
  switchLabelActive: {
    color: Colors.dark.text,
    fontWeight: '600',
  },
  notesInput: {
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.dark.text,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    minHeight: 100,
  },
  summaryCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    marginBottom: Spacing.xxl,
    ...Shadows.small,
  },
  summaryTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: Spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.85)',
  },
  summaryLabel: {
    fontSize: FontSize.sm,
    color: Colors.dark.textMuted,
  },
  summaryValue: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.dark.text,
  },
});
