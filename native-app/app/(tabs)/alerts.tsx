import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Switch } from 'react-native';
import { router } from 'expo-router';
import { Colors, Spacing, FontSize, BorderRadius, Shadows } from '@/constants/Colors';

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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.dark.green} />
        }
      >
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{alerts.length}</Text>
            <Text style={styles.summaryLabel}>Total Alerts</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: Colors.dark.green }]}>{activeCount}</Text>
            <Text style={styles.summaryLabel}>Active</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: Colors.dark.textMuted }]}>{alerts.length - activeCount}</Text>
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
                trackColor={{ false: Colors.dark.card, true: Colors.dark.greenSoft }}
                thumbColor={alert.active ? Colors.dark.green : Colors.dark.textMuted}
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
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    marginBottom: Spacing.md,
    ...Shadows.soft,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: Spacing.xs,
  },
  summaryLabel: {
    fontSize: FontSize.sm,
    color: Colors.dark.textMuted,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
  },
  alertCard: {
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
  alertCardInactive: {
    opacity: 0.5,
  },
  alertLeft: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.dark.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertIconText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.dark.accent,
  },
  alertTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: 4,
  },
  alertSymbol: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  triggeredBadge: {
    backgroundColor: Colors.dark.greenSoft,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.dark.greenBorder,
  },
  triggeredText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.dark.greenText,
  },
  alertCondition: {
    fontSize: FontSize.sm,
    color: Colors.dark.textMuted,
    marginBottom: 2,
  },
  alertCurrent: {
    fontSize: FontSize.xs,
    color: Colors.dark.textMuted,
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
