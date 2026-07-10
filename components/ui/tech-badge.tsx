import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';

interface TechBadgeProps {
  name: string;
  theme?: 'cyan' | 'purple' | 'blue' | 'green' | 'neutral';
  style?: StyleProp<ViewStyle>;
}

export function TechBadge({ name, theme = 'neutral', style }: TechBadgeProps) {
  const getColors = () => {
    switch (theme) {
      case 'cyan':
        return {
          bg: 'rgba(6, 182, 212, 0.1)',
          border: 'rgba(6, 182, 212, 0.25)',
          text: '#22d3ee',
        };
      case 'purple':
        return {
          bg: 'rgba(168, 85, 247, 0.1)',
          border: 'rgba(168, 85, 247, 0.25)',
          text: '#c084fc',
        };
      case 'blue':
        return {
          bg: 'rgba(59, 130, 246, 0.1)',
          border: 'rgba(59, 130, 246, 0.25)',
          text: '#60a5fa',
        };
      case 'green':
        return {
          bg: 'rgba(34, 197, 94, 0.1)',
          border: 'rgba(34, 197, 94, 0.25)',
          text: '#4ade80',
        };
      default:
        return {
          bg: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.12)',
          text: '#9BA1A6',
        };
    }
  };

  const colors = getColors();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: colors.text }]}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 6,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
