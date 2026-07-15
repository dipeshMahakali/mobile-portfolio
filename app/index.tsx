import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import {
  Animated,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassCard } from '@/components/ui/glass-card';
import { GradientBackground } from '@/components/ui/gradient-background';
import { SidebarMenu } from '@/components/ui/sidebar-menu';
import { SwipeButton } from '@/components/ui/swipe-button';
import { CONFIG } from '@/constants/config';
import { fetchMetrics, fetchPersonalInfo, MetricItem, PersonalInfo } from '@/services/api';

export default function LandingScreen() {
  const insets = useSafeAreaInsets();
  const [info, setInfo] = React.useState<PersonalInfo>(CONFIG.personalInfo);
  const [metrics, setMetrics] = React.useState<MetricItem[]>(CONFIG.metrics);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const spinValue = React.useRef(new Animated.Value(0)).current;
  const pulseValue = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    // Spin animation for royal orbit
    const spinAnim = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    );
    spinAnim.start();

    // Breathing pulse animation for royal glow
    const pulseAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.06,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1.0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnim.start();

    return () => {
      spinAnim.stop();
      pulseAnim.stop();
    };
  }, [spinValue, pulseValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  React.useEffect(() => {
    let active = true;
    async function loadData() {
      try {
        const [infoData, metricsData] = await Promise.all([
          fetchPersonalInfo(),
          fetchMetrics(),
        ]);
        if (active) {
          if (infoData) setInfo(infoData);
          if (metricsData && metricsData.length > 0) {
            // Take the first 3 metrics for the landing page overlay card
            setMetrics(metricsData.slice(0, 3));
          }
        }
      } catch (err) {
        console.error('Failed loading landing data:', err);
      }
    }
    loadData();
    return () => {
      active = false;
    };
  }, []);

  const shortName = info.shortName || CONFIG.personalInfo.shortName;
  const email = info.email || CONFIG.personalInfo.email;
  const phone = info.phone || CONFIG.personalInfo.phone;
  const name = info.name || CONFIG.personalInfo.name;
  const title = info.title || CONFIG.personalInfo.title;
  const description = info.description || CONFIG.personalInfo.description;

  const handleExplorePress = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.replace('/(tabs)/home');
  };

  const handlePhonePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmailPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <GradientBackground enableSafeArea={false} style={styles.container}>
      <SidebarMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <View
        style={[
          styles.mainContent,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }
        ]}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>DP</Text>
            </View>
            <Text style={styles.logoText}>{shortName}</Text>
          </View>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setIsMenuOpen(true);
            }}
            style={({ pressed }) => [
              styles.menuButton,
              pressed && { transform: [{ scale: 0.95 }], backgroundColor: 'rgba(255,255,255,0.08)' }
            ]}
          >
            <Ionicons name="grid-outline" size={20} color="#fff" />
          </Pressable>
        </View>

        {/* HERO IMAGE SECTION (Royal crest & Avatar) */}
        <View style={styles.heroSection}>
          <View style={styles.avatarWrapper}>
            {/* Royal Glow Ring (Pulsing) */}
            <Animated.View style={[styles.royalGlowRing, { transform: [{ scale: pulseValue }] }]} />

            {/* Royal Metallic Inner Ring */}
            <View style={styles.royalInnerRing} />

            {/* Royal Spinning Dashed Orbit */}
            <Animated.View style={[styles.royalOuterDashedRing, { transform: [{ rotate: spin }] }]} />

            {/* Centralized Avatar Image */}
            <Image
              source={require('@/assets/images/royal-avatar.png')}
              style={styles.avatarImage}
              contentFit="cover"
              transition={300}
            />

          </View>

          {/* Email Pill (Centered below the avatar, guaranteed no overlap!) */}
          <Pressable
            onPress={handleEmailPress}
            style={({ pressed }) => [
              styles.emailPill,
              pressed && { transform: [{ scale: 0.96 }], opacity: 0.9 }
            ]}
          >
            <Ionicons name="mail-outline" size={14} color="#fbbf24" />
            <Text style={styles.emailPillText} numberOfLines={1} ellipsizeMode="tail">
              {email}
            </Text>
          </Pressable>
        </View>

        {/* METRICS ROW (Perfectly adjusted below the avatar, no overlap!) */}
        <View style={styles.metricsRow}>
          {metrics.map((metric) => (
            <GlassCard key={metric.label} style={styles.metricCard} glowColor="cyan">
              <Text style={styles.metricValue}>{metric.value}{metric.suffix || ''}</Text>
              <Text style={styles.metricLabel} numberOfLines={1}>{metric.label}</Text>
            </GlassCard>
          ))}
        </View>

        {/* PROFILE INTRO */}
        <View style={styles.introSection}>
          <Text style={styles.introName}>{name}</Text>
          <Text style={styles.introTitle}>{title}</Text>
          <Text style={styles.introDescription}>{description}</Text>
        </View>

        {/* ACTIONS */}
        <View style={styles.actionsColumn}>
          <SwipeButton
            onSwipeSuccess={handleExplorePress}
            title="Swipe to Explore Profile"
            icon="arrow-forward"
            color="#06b6d4"
            activeColor="#3b82f6"
          />

          <SwipeButton
            onSwipeSuccess={handlePhonePress}
            title="Swipe to Call Now"
            icon="call"
            color="#ea580c"
            activeColor="#22c55e"
          />
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#f97316',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    flex: 1,
    maxHeight: 300,
  },
  avatarWrapper: {
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarImage: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 4,
    borderColor: '#fbbf24', // Royal Gold
    position: 'absolute',
    zIndex: 5,
  },
  royalGlowRing: {
    width: 176,
    height: 176,
    borderRadius: 88,
    backgroundColor: 'rgba(251, 191, 36, 0.12)',
    position: 'absolute',
    zIndex: 1,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 8,
  },
  royalInnerRing: {
    width: 194,
    height: 194,
    borderRadius: 97,
    borderWidth: 1.5,
    borderColor: '#d97706', // Amber gold border
    position: 'absolute',
    zIndex: 2,
  },
  royalOuterDashedRing: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1.5,
    borderColor: 'rgba(251, 191, 36, 0.45)', // Semitransparent gold dashed ring
    borderStyle: 'dashed',
    position: 'absolute',
    zIndex: 3,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  metricCard: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#06b6d4',
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#9BA1A6',
    marginTop: 2,
    textAlign: 'center',
  },
  emailPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(21, 23, 24, 0.85)',
    borderColor: 'rgba(251, 191, 36, 0.35)', // Gold theme border
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginTop: -4,
    zIndex: 10,
    maxWidth: '85%',
  },
  emailPillText: {
    color: '#9BA1A6',
    fontSize: 11,
    fontWeight: '700',
  },
  introSection: {
    marginTop: 5,
    marginBottom: 15,
  },
  introName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  introTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f97316',
    marginBottom: 12,
  },
  introDescription: {
    fontSize: 13,
    color: '#9BA1A6',
    lineHeight: 18,
  },
  actionsColumn: {
    flexDirection: 'column',
    width: '100%',
    gap: 12,
    marginBottom: 5,
  },
});
