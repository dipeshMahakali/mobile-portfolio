import React, { useEffect } from 'react';
import { StyleSheet, View, DimensionValue } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

interface SparklesProps {
  count?: number;
  color?: string;
}

export function Sparkles({ count = 8, color = '#f97316' }: SparklesProps) {
  // Pre-defined positions matching the reference image's star field layout
  const sparkleConfigs = [
    { top: '15%' as DimensionValue, left: '8%' as DimensionValue, delay: 0, size: 3.5 },     // Top Left near icon
    { top: '18%' as DimensionValue, left: '76%' as DimensionValue, delay: 400, size: 4.0 },   // Top Right
    { top: '30%' as DimensionValue, left: '54%' as DimensionValue, delay: 1200, size: 2.5 },  // Middle cluster 1
    { top: '38%' as DimensionValue, left: '60%' as DimensionValue, delay: 1000, size: 3.2 },  // Middle cluster 2
    { top: '48%' as DimensionValue, left: '58%' as DimensionValue, delay: 600, size: 3.0 },   // Middle cluster 3
    { top: '52%' as DimensionValue, left: '49%' as DimensionValue, delay: 800, size: 2.8 },   // Middle cluster 4
    { top: '88%' as DimensionValue, left: '35%' as DimensionValue, delay: 1400, size: 3.0 },  // Bottom center
    { top: '65%' as DimensionValue, left: '68%' as DimensionValue, delay: 1600, size: 2.5 },  // Lower Right
  ].slice(0, count);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {sparkleConfigs.map((config, index) => (
        <SingleSparkle
          key={index}
          top={config.top}
          left={config.left}
          delay={config.delay}
          size={config.size}
          color={color}
        />
      ))}
    </View>
  );
}

interface SingleSparkleProps {
  top: DimensionValue;
  left: DimensionValue;
  delay: number;
  size: number;
  color: string;
}

function SingleSparkle({ top, left, delay, size, color }: SingleSparkleProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1.3, { duration: 700 }), // smooth slow swell
          withTiming(0.8, { duration: 350 }), // settle
          withTiming(0, { duration: 1600 })   // slow organic decay
        ),
        -1,
        false
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.7, { duration: 700 }),
          withTiming(1, { duration: 350 }),
          withTiming(0, { duration: 1600 })
        ),
        -1,
        false
      )
    );
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const glowSize = size * 3.5;

  return (
    <Animated.View
      style={[
        styles.sparkleContainer,
        { top, left },
        animatedStyle,
      ]}
    >
      {/* Outer Colored Halo Glow */}
      <View
        style={{
          width: glowSize,
          height: glowSize,
          borderRadius: glowSize / 2,
          backgroundColor: color,
          opacity: 0.3,
          position: 'absolute',
          shadowColor: color,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 5,
        }}
      />
      {/* Inner White Core Dot */}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: '#ffffff',
          position: 'absolute',
          shadowColor: '#ffffff',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.9,
          shadowRadius: 2,
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sparkleContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
