import React from 'react';
import { StyleSheet, View, ViewStyle, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  enableSafeArea?: boolean;
}

export function GradientBackground({
  children,
  style,
  enableSafeArea = true,
}: GradientBackgroundProps) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#0a0a1a', '#0d0d1f', '#070714']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[
        styles.container,
        enableSafeArea && {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0a0a1a" />
      <View style={[styles.inner, style]}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});
