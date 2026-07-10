import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React from 'react';
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import { GlassCard } from '@/components/ui/glass-card';
import { GradientBackground } from '@/components/ui/gradient-background';
import { TechBadge } from '@/components/ui/tech-badge';

export default function HomeScreen() {
  const personalInfo = {
    name: "Dipesh Patel",
    title: "Python Developer, AI & IOT Enthusiast",
    description: "Passionate about building innovative solutions using Python, Artificial Intelligence, and Internet of Things technologies.",
    email: "dipesh.patel1902@gmail.com",
    phone: "8319821606",
    location: "India",
    github: "https://github.com/starkdipesh",
    linkedin: "https://linkedin.com/in/dipeshpatel",
  };

  const handleEmailPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(`mailto:${personalInfo.email}`);
  };

  const handlePhonePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(`tel:${personalInfo.phone}`);
  };

  const handleSocialPress = (url: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(url);
  };

  const handleHirePress = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push('/(tabs)/contact');
  };

  return (
    <GradientBackground enableSafeArea>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO SECTION */}
        <View style={styles.heroContainer}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarGlow} />
            <View style={styles.avatarInner}>
              <Text style={styles.avatarText}>DP</Text>
            </View>
          </View>

          <View style={styles.welcomeRow}>
            <Text style={styles.welcomeText}>Hello, I'm</Text>
            <HelloWave />
          </View>

          <Text style={styles.nameText}>{personalInfo.name}</Text>
          <Text style={styles.titleText}>{personalInfo.title}</Text>
          <Text style={styles.taglineText}>
            Building high-performance automation & neural intelligence systems.
          </Text>

          <View style={styles.actionRow}>
            <Pressable
              onPress={handleHirePress}
              style={({ pressed }) => [
                styles.hireButton,
                pressed && { transform: [{ scale: 0.96 }] },
              ]}
            >
              <Text style={styles.hireButtonText}>Let's Connect</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </Pressable>
          </View>
        </View>

        {/* ABOUT ME SECTION (BENTO GRID) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            About <Text style={{ color: '#06b6d4' }}>Me</Text>
          </Text>
          <Text style={styles.sectionSubtitle}>
            Key specialization areas & background
          </Text>
        </View>

        <View style={styles.bentoGrid}>
          {/* Main Info Bio Card */}
          <GlassCard style={styles.bioCard} glowColor="cyan">
            <View style={styles.bioHeader}>
              <View style={styles.bioAvatar}>
                <Text style={styles.bioAvatarText}>DP</Text>
              </View>
              <View>
                <Text style={styles.bioName}>{personalInfo.name}</Text>
                <Text style={styles.bioTitle}>Developer & Tinkerer</Text>
              </View>
            </View>

            <Text style={styles.bioDescription}>{personalInfo.description}</Text>

            <View style={styles.contactDetails}>
              <Pressable onPress={handleEmailPress} style={styles.contactRow}>
                <Ionicons name="mail" size={16} color="#06b6d4" />
                <Text style={styles.contactRowText}>{personalInfo.email}</Text>
              </Pressable>
              <Pressable onPress={handlePhonePress} style={styles.contactRow}>
                <Ionicons name="call" size={16} color="#06b6d4" />
                <Text style={styles.contactRowText}>+91 {personalInfo.phone}</Text>
              </Pressable>
              <View style={styles.contactRow}>
                <Ionicons name="location" size={16} color="#06b6d4" />
                <Text style={styles.contactRowText}>{personalInfo.location}</Text>
              </View>
            </View>

            <View style={styles.socialGlowRow}>
              <Pressable
                onPress={() => handleSocialPress(personalInfo.github)}
                style={styles.socialBadge}
              >
                <Ionicons name="logo-github" size={18} color="#06b6d4" />
              </Pressable>
              <Pressable
                onPress={() => handleSocialPress(personalInfo.linkedin)}
                style={styles.socialBadge}
              >
                <Ionicons name="logo-linkedin" size={18} color="#06b6d4" />
              </Pressable>
            </View>
          </GlassCard>

          {/* Core Specialty Rows */}
          <View style={styles.specialtySplitRow}>
            {/* Python Card */}
            <GlassCard style={styles.smallSpecialtyCard} glowColor="purple">
              <Ionicons name="code-working" size={32} color="#a855f7" style={styles.specialtyIcon} />
              <Text style={styles.specialtyTitle}>Python Expert</Text>
              <Text style={styles.specialtyDesc}>
                Advanced scripts, scraping, pipelines, & integrations.
              </Text>
            </GlassCard>

            {/* IoT Card */}
            <GlassCard style={styles.smallSpecialtyCard} glowColor="blue">
              <Ionicons name="hardware-chip" size={32} color="#3b82f6" style={styles.specialtyIcon} />
              <Text style={styles.specialtyTitle}>IoT Dev</Text>
              <Text style={styles.specialtyDesc}>
                Building telemetry and micro-controller automation.
              </Text>
            </GlassCard>
          </View>

          {/* AI Card */}
          <GlassCard style={styles.wideSpecialtyCard} glowColor="cyan">
            <View style={styles.aiBadgeHeader}>
              <Ionicons name="bulb" size={36} color="#06b6d4" />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={styles.specialtyTitle}>AI & Neural Systems</Text>
                <Text style={styles.specialtyDesc}>
                  Proficient in data processing, model accuracy assessments, and natural language interfaces.
                </Text>
              </View>
            </View>
            <View style={styles.badgeRow}>
              <TechBadge name="PyTorch" theme="cyan" />
              <TechBadge name="Scikit-Learn" theme="cyan" />
              <TechBadge name="Pandas" theme="cyan" />
              <TechBadge name="NLP" theme="cyan" />
            </View>
          </GlassCard>
        </View>

        {/* METRICS DASHBOARD */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Dashboard <Text style={{ color: '#3b82f6' }}>Metrics</Text>
          </Text>
          <Text style={styles.sectionSubtitle}>
            Quantifiable professional indicators
          </Text>
        </View>

        <View style={styles.metricsContainer}>
          <GlassCard style={styles.metricCard} glowColor="cyan">
            <Text style={styles.metricNumber}>15+</Text>
            <Text style={styles.metricLabel}>Python Projects</Text>
          </GlassCard>

          <GlassCard style={styles.metricCard} glowColor="purple">
            <Text style={[styles.metricNumber, { color: '#a855f7' }]}>92%</Text>
            <Text style={styles.metricLabel}>Voice Accuracy</Text>
          </GlassCard>

          <GlassCard style={styles.metricCard} glowColor="blue">
            <Text style={[styles.metricNumber, { color: '#3b82f6' }]}>94%</Text>
            <Text style={styles.metricLabel}>Model Accuracy</Text>
          </GlassCard>

          <GlassCard style={styles.metricCard} glowColor="none">
            <Text style={[styles.metricNumber, { color: '#ECEDEE' }]}>8+</Text>
            <Text style={styles.metricLabel}>Core Skills</Text>
          </GlassCard>
        </View>

        <View style={{ height: Platform.OS === 'ios' ? 100 : 80 }} />
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingTop: 10,
  },
  heroContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  avatarGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 48,
    backgroundColor: '#06b6d4',
    opacity: 0.15,
    transform: [{ scale: 1.15 }],
  },
  avatarInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(21, 23, 24, 0.9)',
    borderWidth: 2,
    borderColor: '#06b6d4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  welcomeText: {
    color: '#06b6d4',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  nameText: {
    color: '#ECEDEE',
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  titleText: {
    color: '#9BA1A6',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  taglineText: {
    color: 'rgba(155, 161, 166, 0.75)',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 28,
    marginBottom: 24,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  hireButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#06b6d4',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  hireButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 16,
    paddingLeft: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ECEDEE',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#9BA1A6',
  },
  bentoGrid: {
    gap: 16,
    marginBottom: 16,
  },
  bioCard: {
    padding: 24,
  },
  bioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bioAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#06b6d4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bioAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  bioName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ECEDEE',
  },
  bioTitle: {
    fontSize: 12,
    color: '#06b6d4',
    fontWeight: '500',
  },
  bioDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
    marginBottom: 20,
  },
  contactDetails: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 14,
    marginBottom: 16,
    gap: 10,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contactRowText: {
    fontSize: 13,
    color: '#9BA1A6',
    fontWeight: '500',
  },
  socialGlowRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
  },
  specialtySplitRow: {
    flexDirection: 'row',
    gap: 16,
  },
  smallSpecialtyCard: {
    flex: 1,
    padding: 16,
  },
  specialtyIcon: {
    marginBottom: 12,
  },
  specialtyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ECEDEE',
    marginBottom: 6,
  },
  specialtyDesc: {
    fontSize: 12,
    color: '#9BA1A6',
    lineHeight: 16,
  },
  wideSpecialtyCard: {
    padding: 20,
  },
  aiBadgeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  metricCard: {
    width: '47.5%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  metricNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#06b6d4',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#9BA1A6',
    fontWeight: '600',
    textAlign: 'center',
  },
});
