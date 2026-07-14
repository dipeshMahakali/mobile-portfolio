import React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  ViewStyle,
  StyleProp,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Sparkles } from './sparkles';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  glowColor?: 'cyan' | 'purple' | 'blue' | 'emerald' | 'rose' | 'slate' | 'none';
  onPress?: () => void;
  showSparkles?: boolean;
}

export function GlassCard({
  children,
  style,
  glowColor = 'none',
  onPress,
  showSparkles = true,
}: GlassCardProps) {
  const getBorderColor = () => {
    switch (glowColor) {
      case 'cyan':
        return 'rgba(6, 182, 212, 0.25)';
      case 'purple':
        return 'rgba(168, 85, 247, 0.25)';
      case 'blue':
        return 'rgba(59, 130, 246, 0.25)';
      case 'emerald':
        return 'rgba(16, 185, 129, 0.25)';
      case 'rose':
        return 'rgba(244, 63, 94, 0.25)';
      case 'slate':
        return 'rgba(100, 116, 139, 0.25)';
      default:
        return 'rgba(255, 255, 255, 0.08)';
    }
  };

  const getSparkleColor = () => {
    switch (glowColor) {
      case 'cyan':
        return '#22d3ee';
      case 'purple':
        return '#d8b4fe';
      case 'blue':
        return '#93c5fd';
      case 'emerald':
        return '#34d399';
      case 'rose':
        return '#fda4af';
      case 'slate':
        return '#cbd5e1';
      default:
        return '#f97316';
    }
  };

  const handlePress = () => {
    if (onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const cardStyle = [
    styles.card,
    {
      borderColor: getBorderColor(),
      backgroundColor: 'rgba(21, 23, 24, 0.65)',
    },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          cardStyle,
          pressed && {
            transform: [{ scale: 0.98 }],
            backgroundColor: 'rgba(30, 30, 50, 0.8)',
            borderColor: glowColor !== 'none' ? getBorderColor().replace('0.25', '0.5') : 'rgba(255, 255, 255, 0.15)',
          },
        ]}
      >
        {showSparkles && <Sparkles color={getSparkleColor()} count={8} />}
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyle}>
      {showSparkles && <Sparkles color={getSparkleColor()} count={8} />}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
      web: {
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      }
    }),
  },
});

