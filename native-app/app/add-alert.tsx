import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

const COLORS = {
  background: '#05070b',
  card: '#111624',
  accent: '#14b8a6',
  accentSoft: 'rgba(20, 184, 166, 0.12)',
  green: '#22c55e',
  greenSoft: 'rgba(34, 197, 94, 0.12)',
  tealLight: '#a5f3fc',
  tealBorder: 'rgba(34, 197, 235, 0.35)',
  text: '#f9fafb',
  textMuted: '#9ca3af',
  border: '#1f2933',
};

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
          <Text style={styles.label}>Condition</Text>
          <View style={styles.conditionRow}>
            {conditions.map((c, index) => (
              <TouchableOpacity
                key={c}
                style={[styles.conditionButton, condition === index && styles.conditionButtonActive]}
                onPress={() => setCondition(index)}
              >
                <Text style={[styles.conditionText, condition === index && styles.conditionTextActive]}>
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
              placeholderTextColor={COLORS.textMuted}
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
                trackColor={{ false: COLORS.card, true: COLORS.greenSoft }}
                thumbColor={pushEnabled ? COLORS.green : COLORS.textMuted}
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
                trackColor={{ false: COLORS.card, true: COLORS.greenSoft }}
                thumbColor={emailEnabled ? COLORS.green : COLORS.textMuted}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add any notes about this alert..."
            placeholderTextColor={COLORS.textMuted}
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
  conditionRow: { flexDirection: 'row', gap: 8 },
  conditionButton: { flex: 1, paddingVertical: 16, borderRadius: 18, alignItems: 'center', backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border },
  conditionButtonActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  conditionText: { fontSize: 15, fontWeight: '600', color: COLORS.textMuted },
  conditionTextActive: { color: '#0b1120' },
  priceInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 18, paddingHorizontal: 16, borderWidth: 1, borderColor: COLORS.border },
  currencySymbol: { fontSize: 20, color: COLORS.textMuted, marginRight: 8 },
  priceInputField: { flex: 1, paddingVertical: 16, fontSize: 20, fontWeight: '600', color: COLORS.text },
  notificationCard: { backgroundColor: COLORS.card, borderRadius: 18, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden' },
  notificationRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  notificationLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  notificationIcon: { fontSize: 20 },
  notificationLabel: { fontSize: 15, color: COLORS.text },
  divider: { height: 1, backgroundColor: 'rgba(15, 23, 42, 0.85)', marginHorizontal: 16 },
  notesInput: { backgroundColor: COLORS.card, borderRadius: 18, padding: 16, fontSize: 15, color: COLORS.text, borderWidth: 1, borderColor: COLORS.border, minHeight: 80 },
  previewCard: { backgroundColor: COLORS.accentSoft, borderRadius: 18, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: COLORS.tealBorder },
  previewTitle: { fontSize: 13, fontWeight: '600', color: COLORS.tealLight, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  previewContent: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  previewIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(20, 184, 166, 0.2)', alignItems: 'center', justifyContent: 'center' },
  previewIconText: { fontSize: 18 },
  previewText: { flex: 1, fontSize: 15, color: COLORS.text, lineHeight: 22 },
  previewHighlight: { fontWeight: '700', color: COLORS.accent },
  createButton: { backgroundColor: COLORS.accent, borderRadius: 999, padding: 16, alignItems: 'center', marginBottom: 48 },
  createButtonText: { fontSize: 16, fontWeight: '600', color: '#0b1120' },
});
