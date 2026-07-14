import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from './glass-card';

interface WavySkeletonProps {
  width?: any;
  height?: any;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export function WavySkeleton({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
}: WavySkeletonProps) {
  const [layoutWidth, setLayoutWidth] = React.useState(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (layoutWidth > 0) {
      translateX.value = -layoutWidth;
      translateX.value = withRepeat(
        withTiming(layoutWidth, { duration: 1500 }),
        -1,
        false
      );
    }
  }, [layoutWidth]);

  const shimmerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View
      style={[
        styles.skeletonContainer,
        { width, height, borderRadius },
        style,
      ]}
      onLayout={(e) => setLayoutWidth(e.nativeEvent.layout.width)}
    >
      {layoutWidth > 0 && (
        <Animated.View style={[styles.shimmerWrapper, shimmerStyle]}>
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0)',
              'rgba(255, 255, 255, 0.08)',
              'rgba(255, 255, 255, 0)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
        </Animated.View>
      )}
    </View>
  );
}

// SKELETON VARIANTS MATCHING EACH CARD TYPE IN THE PORTFOLIO

export function SkeletonProjectCard({ glowColor = 'none', style }: { glowColor?: 'cyan' | 'purple' | 'blue' | 'none', style?: StyleProp<ViewStyle> }) {
  return (
    <GlassCard glowColor={glowColor} style={[styles.cardPadding, style]}>
      <View style={styles.headerRow}>
        <WavySkeleton width="55%" height={22} borderRadius={6} />
        <WavySkeleton width={20} height={20} borderRadius={10} />
      </View>
      <View style={styles.textSpacing}>
        <WavySkeleton width="95%" height={14} borderRadius={4} />
        <WavySkeleton width="75%" height={14} borderRadius={4} style={{ marginTop: 8 }} />
      </View>
      <View style={styles.badgesRow}>
        <WavySkeleton width={60} height={24} borderRadius={8} />
        <WavySkeleton width={75} height={24} borderRadius={8} />
        <WavySkeleton width={50} height={24} borderRadius={8} />
      </View>
      <View style={styles.metricsRow}>
        <View style={styles.metricBlock}>
          <WavySkeleton width={50} height={10} borderRadius={2} />
          <WavySkeleton width={40} height={16} borderRadius={4} style={{ marginTop: 4 }} />
        </View>
        <View style={styles.metricBlock}>
          <WavySkeleton width={60} height={10} borderRadius={2} />
          <WavySkeleton width={35} height={16} borderRadius={4} style={{ marginTop: 4 }} />
        </View>
      </View>
      <WavySkeleton width="100%" height={40} borderRadius={14} style={{ marginTop: 12 }} />
    </GlassCard>
  );
}

export function SkeletonExperienceCard({ theme = 'purple', style }: { theme?: 'cyan' | 'purple' | 'blue' | 'emerald' | 'rose' | 'slate', style?: StyleProp<ViewStyle> }) {
  return (
    <GlassCard glowColor={theme} style={[styles.cardPadding, style]}>
      <WavySkeleton width="35%" height={12} borderRadius={3} style={{ marginBottom: 8 }} />
      <WavySkeleton width="70%" height={18} borderRadius={4} style={{ marginBottom: 6 }} />
      <WavySkeleton width="50%" height={14} borderRadius={4} style={{ marginBottom: 12 }} />
      <View style={styles.textSpacing}>
        <WavySkeleton width="100%" height={13} borderRadius={4} />
        <WavySkeleton width="90%" height={13} borderRadius={4} style={{ marginTop: 6 }} />
      </View>
      <View style={styles.badgesRow}>
        <WavySkeleton width={55} height={22} borderRadius={8} />
        <WavySkeleton width={65} height={22} borderRadius={8} />
        <WavySkeleton width={45} height={22} borderRadius={8} />
      </View>
    </GlassCard>
  );
}

export function SkeletonCertCard({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <GlassCard glowColor="none" style={[styles.cardPadding, styles.rowLayout, style]}>
      <WavySkeleton width={40} height={40} borderRadius={20} style={{ marginRight: 14 }} />
      <View style={{ flex: 1 }}>
        <WavySkeleton width="70%" height={15} borderRadius={4} style={{ marginBottom: 6 }} />
        <WavySkeleton width="45%" height={12} borderRadius={3} />
      </View>
    </GlassCard>
  );
}

export function SkeletonApproachCard({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <GlassCard glowColor="cyan" style={[styles.cardPadding, style]}>
      <View style={[styles.headerRow, { marginBottom: 12 }]}>
        <WavySkeleton width={36} height={36} borderRadius={18} />
        <WavySkeleton width={20} height={16} borderRadius={4} />
      </View>
      <WavySkeleton width="50%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
      <View style={styles.textSpacing}>
        <WavySkeleton width="100%" height={12} borderRadius={3} />
        <WavySkeleton width="80%" height={12} borderRadius={3} style={{ marginTop: 6 }} />
      </View>
    </GlassCard>
  );
}

export function SkeletonSkillCard({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <GlassCard glowColor="cyan" style={[styles.skillCardPadding, style]}>
      <View style={[styles.headerRow, { marginBottom: 8 }]}>
        <WavySkeleton width="45%" height={14} borderRadius={4} />
        <WavySkeleton width="15%" height={12} borderRadius={4} />
      </View>
      <WavySkeleton width="100%" height={4} borderRadius={2} />
    </GlassCard>
  );
}

export function SkeletonActivityCard({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <GlassCard glowColor="purple" style={[styles.cardPadding, style]}>
      {[0, 1, 2, 3].map((idx) => (
        <View key={idx} style={[styles.rowLayout, { marginTop: idx > 0 ? 14 : 0 }]}>
          <View style={styles.activityDotCol}>
            <WavySkeleton width={8} height={8} borderRadius={4} />
            {idx < 3 && <View style={styles.activityLine} />}
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <View style={[styles.headerRow, { marginBottom: 4 }]}>
              <WavySkeleton width="50%" height={14} borderRadius={4} />
              <WavySkeleton width="20%" height={10} borderRadius={3} />
            </View>
            <WavySkeleton width="80%" height={12} borderRadius={3} />
          </View>
        </View>
      ))}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
    position: 'relative',
  },
  shimmerWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  gradient: {
    flex: 1,
    width: '100%',
  },
  cardPadding: {
    padding: 20,
  },
  skillCardPadding: {
    padding: 14,
  },
  rowLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  textSpacing: {
    marginVertical: 14,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8,
  },
  metricsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 14,
    marginBottom: 8,
    gap: 24,
  },
  metricBlock: {
    flexDirection: 'column',
  },
  activityDotCol: {
    alignItems: 'center',
    width: 8,
  },
  activityLine: {
    width: 1,
    height: 38,
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
    marginTop: 4,
  },
});
