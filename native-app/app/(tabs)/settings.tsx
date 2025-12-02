import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { Colors, Spacing, FontSize, BorderRadius, Shadows } from '@/constants/Colors';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [biometrics, setBiometrics] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <View style={styles.userRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>MS</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Market Scanner User</Text>
                <Text style={styles.userEmail}>user@example.com</Text>
              </View>
              <View style={styles.planBadge}>
                <Text style={styles.planText}>FREE</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: Colors.dark.card, true: Colors.dark.greenSoft }}
                thumbColor={notifications ? Colors.dark.green : Colors.dark.textMuted}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: Colors.dark.card, true: Colors.dark.greenSoft }}
                thumbColor={darkMode ? Colors.dark.green : Colors.dark.textMuted}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Biometric Login</Text>
              <Switch
                value={biometrics}
                onValueChange={setBiometrics}
                trackColor={{ false: Colors.dark.card, true: Colors.dark.greenSoft }}
                thumbColor={biometrics ? Colors.dark.green : Colors.dark.textMuted}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scanner Settings</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.menuRow}>
              <Text style={styles.menuLabel}>Default Market</Text>
              <Text style={styles.menuValue}>Equities</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuRow}>
              <Text style={styles.menuLabel}>Default Timeframe</Text>
              <Text style={styles.menuValue}>1D</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuRow}>
              <Text style={styles.menuLabel}>Custom Symbols</Text>
              <Text style={styles.menuValue}>12 symbols</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.menuRow}>
              <Text style={styles.menuLabel}>Help Center</Text>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuRow}>
              <Text style={styles.menuLabel}>Contact Support</Text>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuRow}>
              <Text style={styles.menuLabel}>Privacy Policy</Text>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuRow}>
              <Text style={styles.menuLabel}>Terms of Service</Text>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Market Scanner Pro v1.0.0</Text>
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
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.dark.textMuted,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    overflow: 'hidden',
    ...Shadows.small,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.dark.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: '#0b1120',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  userEmail: {
    fontSize: FontSize.sm,
    color: Colors.dark.textMuted,
  },
  planBadge: {
    backgroundColor: Colors.dark.greenSoft,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.dark.greenBorder,
  },
  planText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.dark.greenText,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  settingLabel: {
    fontSize: FontSize.md,
    color: Colors.dark.text,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  menuLabel: {
    fontSize: FontSize.md,
    color: Colors.dark.text,
  },
  menuValue: {
    fontSize: FontSize.md,
    color: Colors.dark.textMuted,
  },
  menuArrow: {
    fontSize: FontSize.md,
    color: Colors.dark.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    marginHorizontal: Spacing.md,
  },
  logoutButton: {
    backgroundColor: Colors.dark.dangerSoft,
    borderRadius: BorderRadius.full,
    padding: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  logoutText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.dark.danger,
  },
  version: {
    textAlign: 'center',
    fontSize: FontSize.sm,
    color: Colors.dark.textMuted,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
});
