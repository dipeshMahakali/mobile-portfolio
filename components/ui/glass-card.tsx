import React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  ViewStyle,
  StyleProp,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  glowColor?: 'cyan' | 'purple' | 'blue' | 'none';
  onPress?: () => void;
}

export function GlassCard({
  children,
  style,
  glowColor = 'none',
  onPress,
}: GlassCardProps) {
  const getBorderColor = () => {
    switch (glowColor) {
      case 'cyan':
        return 'rgba(6, 182, 212, 0.25)';
      case 'purple':
        return 'rgba(168, 85, 247, 0.25)';
      case 'blue':
        return 'rgba(59, 130, 246, 0.25)';
      default:
        return 'rgba(255, 255, 255, 0.08)';
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
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    overflow: 'hidden',
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
