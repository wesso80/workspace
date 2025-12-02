import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Switch } from 'react-native';
import { router } from 'expo-router';

const COLORS = {
  background: '#05070b',
  card: '#111624',
  accent: '#14b8a6',
  accentSoft: 'rgba(20, 184, 166, 0.12)',
  green: '#22c55e',
  greenSoft: 'rgba(34, 197, 94, 0.12)',
  greenText: '#bbf7d0',
  greenBorder: 'rgba(34, 197, 94, 0.7)',
  text: '#f9fafb',
  textMuted: '#9ca3af',
  border: '#1f2933',
};

const mockAlerts = [
  { id: 1, symbol: 'AAPL', condition: 'above', price: 195.00, currentPrice: 189.84, active: true },
  { id: 2, symbol: 'BTC-USD', condition: 'below', price: 60000.00, currentPrice: 67234.50, active: true },
  { id: 3, symbol: 'NVDA', condition: 'above', price: 500.00, currentPrice: 495.22, active: false },
  { id: 4, symbol: 'TSLA', condition: 'below', price: 200.00, currentPrice: 238.45, active: true },
];

export default function AlertsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [alerts, setAlerts] = useState(mockAlerts);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const toggleAlert = (id: number) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const activeCount = alerts.filter(a => a.active).length;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.green} />
        }
      >
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{alerts.length}</Text>
            <Text style={styles.summaryLabel}>Total Alerts</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: COLORS.green }]}>{activeCount}</Text>
            <Text style={styles.summaryLabel}>Active</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: COLORS.textMuted }]}>{alerts.length - activeCount}</Text>
            <Text style={styles.summaryLabel}>Paused</Text>
          </View>
        </View>

        {alerts.map((alert) => {
          const isTriggered = alert.condition === 'above' 
            ? alert.currentPrice >= alert.price 
            : alert.currentPrice <= alert.price;

          return (
            <View key={alert.id} style={[styles.alertCard, !alert.active && styles.alertCardInactive]}>
              <View style={styles.alertLeft}>
                <View style={styles.alertHeader}>
                  <View style={styles.alertIcon}>
                    <Text style={styles.alertIconText}>{alert.symbol.charAt(0)}</Text>
                  </View>
                  <View>
                    <View style={styles.alertTitleRow}>
                      <Text style={styles.alertSymbol}>{alert.symbol}</Text>
                      {isTriggered && alert.active && (
                        <View style={styles.triggeredBadge}>
                          <Text style={styles.triggeredText}>TRIGGERED</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.alertCondition}>
                      Alert when price goes {alert.condition} ${alert.price.toLocaleString()}
                    </Text>
                    <Text style={styles.alertCurrent}>
                      Current: ${alert.currentPrice.toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>
              <Switch
                value={alert.active}
                onValueChange={() => toggleAlert(alert.id)}
                trackColor={{ false: COLORS.card, true: COLORS.greenSoft }}
                thumbColor={alert.active ? COLORS.green : COLORS.textMuted}
              />
            </View>
          );
        })}

        <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={() => router.push('/add-alert')}>
          <Text style={styles.addButtonText}>+ Create Alert</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16 },
  summaryCard: { flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: 18, padding: 24, borderWidth: 1, borderColor: COLORS.border, marginBottom: 16 },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { fontSize: 28, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  summaryLabel: { fontSize: 13, color: COLORS.textMuted },
  divider: { width: 1, backgroundColor: 'rgba(15, 23, 42, 0.85)' },
  alertCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 18, padding: 16, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  alertCardInactive: { opacity: 0.5 },
  alertLeft: { flex: 1 },
  alertHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  alertIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.accentSoft, alignItems: 'center', justifyContent: 'center' },
  alertIconText: { fontSize: 16, fontWeight: '700', color: COLORS.accent },
  alertTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  alertSymbol: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  triggeredBadge: { backgroundColor: COLORS.greenSoft, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, borderWidth: 1, borderColor: COLORS.greenBorder },
  triggeredText: { fontSize: 11, fontWeight: '600', color: COLORS.greenText },
  alertCondition: { fontSize: 13, color: COLORS.textMuted, marginBottom: 2 },
  alertCurrent: { fontSize: 11, color: COLORS.textMuted },
  addButton: { backgroundColor: COLORS.accent, borderRadius: 999, padding: 16, alignItems: 'center', marginTop: 8 },
  addButtonText: { color: '#0b1120', fontSize: 15, fontWeight: '600' },
});
