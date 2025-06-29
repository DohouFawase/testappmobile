import { useTheme } from '@/context/ThemeContext';
import { useAnimations } from '@/hooks/useAnimations';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  style,
}) => {
  const { theme } = useTheme();
  const { scaleWithHaptic, animatedStyles } = useAnimations();

  const handlePress = () => {
    if (!disabled && !loading) {
      scaleWithHaptic().start();
      onPress();
    }
  };

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    if (variant === 'outline') {
      return [...baseStyle, { borderWidth: 1, borderColor: theme.colors.primary }];
    }
    
    return baseStyle;
  };

  const getTextColor = () => {
    if (variant === 'outline') return theme.colors.primary;
    return variant === 'primary' ? '#FFFFFF' : theme.colors.text;
  };

  const gradientColors = variant === 'primary' 
    ? [theme.colors.primary, theme.colors.secondary]
    : [theme.colors.surface, theme.colors.surface];

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      style={[animatedStyles.scale, style]}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[getButtonStyle(), disabled && styles.disabled]}
      >
        {loading ? (
          <Text style={[styles.text, { color: getTextColor() }]}>⏳</Text>
        ) : (
          <>
            {icon && <Text style={styles.icon}>{icon}</Text>}
            <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    minHeight: 48,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    minHeight: 56,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginRight: 8,
    fontSize: 18,
  },
  disabled: {
    opacity: 0.5,
  },
});