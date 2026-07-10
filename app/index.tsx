import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React from 'react';
import {
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
import { CONFIG } from '@/constants/config';
import { fetchPersonalInfo, fetchMetrics, PersonalInfo, MetricItem } from '@/services/api';

export default function LandingScreen() {
  const insets = useSafeAreaInsets();
  const [info, setInfo] = React.useState<PersonalInfo>(CONFIG.personalInfo);
  const [metrics, setMetrics] = React.useState<MetricItem[]>(CONFIG.metrics);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
    router.replace('/(tabs)');
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

        {/* HERO IMAGE SECTION (Orange background shape & Avatar) */}
        <View style={styles.heroSection}>
          <View style={styles.avatarWrapper}>
            {/* Curved Orange Backdrop Circle */}
            <View style={styles.backdropCircle}>
              {/* Grid Lines to simulate basketball / technical sphere */}
              <View style={[styles.gridLine, styles.gridLineHorizontal1]} />
              <View style={[styles.gridLine, styles.gridLineHorizontal2]} />
              <View style={[styles.gridLine, styles.gridLineVertical1]} />
              <View style={[styles.gridLine, styles.gridLineVertical2]} />
            </View>

            {/* Centralized Avatar Image */}
            <Image
              source={{ uri: info.avatarUrl || CONFIG.avatarUrl }}
              style={styles.avatarImage}
              contentFit="cover"
              transition={300}
            />

            {/* Email Pill Overlay (Bottom-Left) */}
            <Pressable
              onPress={handleEmailPress}
              style={({ pressed }) => [
                styles.emailOverlay,
                pressed && { transform: [{ scale: 0.96 }], opacity: 0.9 }
              ]}
            >
              <Ionicons name="mail" size={14} color="#f97316" />
              <Text style={styles.emailOverlayText} numberOfLines={1} ellipsizeMode="tail">
                {email}
              </Text>
            </Pressable>
          </View>
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
        <View style={styles.actionsRow}>
          <Pressable
            onPress={handleExplorePress}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && { transform: [{ scale: 0.96 }] }
            ]}
          >
            <Text style={styles.primaryButtonText}>Explore Profile</Text>
            <View style={styles.arrowIconBg}>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </View>
          </Pressable>

          <View style={styles.phoneActionWrapper}>
            <Pressable
              onPress={handlePhonePress}
              style={({ pressed }) => [
                styles.phoneButton,
                pressed && { transform: [{ scale: 0.92 }] }
              ]}
            >
              <Ionicons name="call" size={18} color="#fff" />
            </Pressable>
            <Pressable onPress={handlePhonePress}>
              <Text style={styles.phoneLabel}>Call Me Now</Text>
            </Pressable>
          </View>
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
    maxHeight: 280,
  },
  avatarWrapper: {
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backdropCircle: {
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: '#ea580c',
    position: 'absolute',
    overflow: 'hidden',
    shadowColor: '#ea580c',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  gridLine: {
    position: 'absolute',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1.5,
  },
  gridLineHorizontal1: {
    top: '30%',
    left: -20,
    right: -20,
    height: 100,
    borderRadius: 100,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  gridLineHorizontal2: {
    bottom: '30%',
    left: -20,
    right: -20,
    height: 100,
    borderRadius: 100,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  gridLineVertical1: {
    left: '30%',
    top: -20,
    bottom: -20,
    width: 100,
    borderRadius: 100,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  gridLineVertical2: {
    right: '30%',
    top: -20,
    bottom: -20,
    width: 100,
    borderRadius: 100,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  avatarImage: {
    width: 175,
    height: 175,
    borderRadius: 87.5,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    position: 'absolute',
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
  emailOverlay: {
    position: 'absolute',
    left: 20,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(21, 23, 24, 0.8)',
    borderColor: 'rgba(249, 115, 22, 0.3)',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    maxWidth: 160,
  },
  emailOverlayText: {
    color: '#9BA1A6',
    fontSize: 10,
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
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 16,
    marginBottom: 5,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f97316',
    paddingLeft: 20,
    paddingRight: 6,
    paddingVertical: 6,
    borderRadius: 30,
    height: 52,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  arrowIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneActionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  phoneButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#ea580c',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ea580c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  phoneLabel: {
    color: '#9BA1A6',
    fontSize: 12,
    fontWeight: '700',
  },
});
