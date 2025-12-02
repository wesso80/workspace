import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Shadows } from '@/constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return Colors.dark.card;
    switch (variant) {
      case 'primary': return Colors.dark.accent;
      case 'secondary': return Colors.dark.secondary;
      case 'outline': return 'transparent';
      case 'danger': return Colors.dark.danger;
      default: return Colors.dark.accent;
    }
  };

  const getTextColor = () => {
    if (disabled) return Colors.dark.textMuted;
    if (variant === 'outline') return Colors.dark.textMuted;
    if (variant === 'primary') return '#0b1120';
    return '#fff';
  };

  const getBorderColor = () => {
    if (variant === 'outline') return Colors.dark.border;
    return 'transparent';
  };

  const getPadding = () => {
    switch (size) {
      case 'sm': return { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md };
      case 'md': return { paddingVertical: 14, paddingHorizontal: 20 };
      case 'lg': return { paddingVertical: Spacing.lg, paddingHorizontal: Spacing.xl };
      default: return { paddingVertical: 14, paddingHorizontal: 20 };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm': return FontSize.sm;
      case 'md': return FontSize.md;
      case 'lg': return FontSize.lg;
      default: return FontSize.md;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { 
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
        },
        getPadding(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <Text style={[
          styles.text,
          { color: getTextColor(), fontSize: getFontSize() },
          textStyle,
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...Shadows.small,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
  },
});
