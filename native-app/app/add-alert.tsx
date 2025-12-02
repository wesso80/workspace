import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Colors, Spacing, FontSize, BorderRadius, Shadows } from '@/constants/Colors';

const conditions = ['Above', 'Below', 'Crosses'];

export default function AddAlertScreen() {
  const [symbol, setSymbol] = useState('');
  const [condition, setCondition] = useState(0);
  const [price, setPrice] = useState('');
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Alert</Text>
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
          <Text style={styles.label}>Condition</Text>
          <View style={styles.conditionRow}>
            {conditions.map((c, index) => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.conditionButton,
                  condition === index && styles.conditionButtonActive,
                ]}
                onPress={() => setCondition(index)}
              >
                <Text style={[
                  styles.conditionText,
                  condition === index && styles.conditionTextActive,
                ]}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Target Price</Text>
          <View style={styles.priceInput}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.priceInputField}
              placeholder="0.00"
              placeholderTextColor={Colors.dark.textMuted}
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Notifications</Text>
          <View style={styles.notificationCard}>
            <View style={styles.notificationRow}>
              <View style={styles.notificationLeft}>
                <Text style={styles.notificationIcon}>📱</Text>
                <Text style={styles.notificationLabel}>Push Notifications</Text>
              </View>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{ false: Colors.dark.card, true: Colors.dark.greenSoft }}
                thumbColor={pushEnabled ? Colors.dark.green : Colors.dark.textMuted}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.notificationRow}>
              <View style={styles.notificationLeft}>
                <Text style={styles.notificationIcon}>📧</Text>
                <Text style={styles.notificationLabel}>Email Notifications</Text>
              </View>
              <Switch
                value={emailEnabled}
                onValueChange={setEmailEnabled}
                trackColor={{ false: Colors.dark.card, true: Colors.dark.greenSoft }}
                thumbColor={emailEnabled ? Colors.dark.green : Colors.dark.textMuted}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add any notes about this alert..."
            placeholderTextColor={Colors.dark.textMuted}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {symbol && price && (
          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>Alert Preview</Text>
            <View style={styles.previewContent}>
              <View style={styles.previewIcon}>
                <Text style={styles.previewIconText}>🔔</Text>
              </View>
              <Text style={styles.previewText}>
                Alert when <Text style={styles.previewHighlight}>{symbol.toUpperCase()}</Text> goes{' '}
                <Text style={styles.previewHighlight}>{conditions[condition].toLowerCase()}</Text>{' '}
                <Text style={styles.previewHighlight}>${parseFloat(price || '0').toLocaleString()}</Text>
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.createButton} onPress={handleSave}>
          <Text style={styles.createButtonText}>Create Alert</Text>
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
  conditionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  conditionButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  conditionButtonActive: {
    backgroundColor: Colors.dark.accent,
    borderColor: Colors.dark.accent,
  },
  conditionText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.dark.textMuted,
  },
  conditionTextActive: {
    color: '#0b1120',
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
    fontSize: FontSize.xl,
    color: Colors.dark.textMuted,
    marginRight: Spacing.sm,
  },
  priceInputField: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: FontSize.xl,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  notificationCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    overflow: 'hidden',
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationLabel: {
    fontSize: FontSize.md,
    color: Colors.dark.text,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    marginHorizontal: Spacing.md,
  },
  notesInput: {
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.dark.text,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    minHeight: 80,
  },
  previewCard: {
    backgroundColor: Colors.dark.accentSoft,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.dark.tealBorder,
  },
  previewTitle: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.dark.tealLight,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  previewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  previewIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(20, 184, 166, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewIconText: {
    fontSize: 18,
  },
  previewText: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.dark.text,
    lineHeight: 22,
  },
  previewHighlight: {
    fontWeight: '700',
    color: Colors.dark.accent,
  },
  createButton: {
    backgroundColor: Colors.dark.accent,
    borderRadius: BorderRadius.full,
    padding: Spacing.md,
    alignItems: 'center',
    marginBottom: Spacing.xxl,
    ...Shadows.small,
  },
  createButtonText: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: '#0b1120',
  },
});
