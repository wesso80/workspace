import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';

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
  danger: '#ef4444',
  dangerSoft: 'rgba(239, 68, 68, 0.12)',
};

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
                trackColor={{ false: COLORS.card, true: COLORS.greenSoft }}
                thumbColor={notifications ? COLORS.green : COLORS.textMuted}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: COLORS.card, true: COLORS.greenSoft }}
                thumbColor={darkMode ? COLORS.green : COLORS.textMuted}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Biometric Login</Text>
              <Switch
                value={biometrics}
                onValueChange={setBiometrics}
                trackColor={{ false: COLORS.card, true: COLORS.greenSoft }}
                thumbColor={biometrics ? COLORS.green : COLORS.textMuted}
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
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted, marginBottom: 8, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 1 },
  card: { backgroundColor: COLORS.card, borderRadius: 18, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden' },
  userRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 16 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.accent, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '700', color: '#0b1120' },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  userEmail: { fontSize: 13, color: COLORS.textMuted },
  planBadge: { backgroundColor: COLORS.greenSoft, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, borderWidth: 1, borderColor: COLORS.greenBorder },
  planText: { fontSize: 11, fontWeight: '700', color: COLORS.greenText },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  settingLabel: { fontSize: 15, color: COLORS.text },
  menuRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  menuLabel: { fontSize: 15, color: COLORS.text },
  menuValue: { fontSize: 15, color: COLORS.textMuted },
  menuArrow: { fontSize: 15, color: COLORS.textMuted },
  divider: { height: 1, backgroundColor: 'rgba(15, 23, 42, 0.85)', marginHorizontal: 16 },
  logoutButton: { backgroundColor: COLORS.dangerSoft, borderRadius: 999, padding: 16, alignItems: 'center', marginTop: 16, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.3)' },
  logoutText: { fontSize: 15, fontWeight: '600', color: COLORS.danger },
  version: { textAlign: 'center', fontSize: 13, color: COLORS.textMuted, marginTop: 24, marginBottom: 48 },
});
