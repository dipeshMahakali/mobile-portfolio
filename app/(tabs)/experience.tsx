import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { GlassCard } from '@/components/ui/glass-card';
import { GradientBackground } from '@/components/ui/gradient-background';
import { TechBadge } from '@/components/ui/tech-badge';
import {
  fetchExperiences,
  fetchApproach,
  fetchCertifications,
  WorkExperience,
  Approach,
  Certification,
} from '@/services/api';
import { SidebarMenu } from '@/components/ui/sidebar-menu';

const getThemeColor = (theme: 'cyan' | 'purple' | 'blue' | 'emerald' | 'rose' | 'slate') => {
  switch (theme) {
    case 'cyan':
      return '#06b6d4';
    case 'blue':
      return '#3b82f6';
    case 'purple':
      return '#a855f7';
    case 'emerald':
      return '#10b981';
    case 'rose':
      return '#f43f5e';
    case 'slate':
      return '#64748b';
    default:
      return '#a855f7';
  }
};

export default function ExperienceScreen() {
  const [experiences, setExperiences] = React.useState<WorkExperience[]>([]);
  const [approaches, setApproaches] = React.useState<Approach[]>([]);
  const [certifications, setCertifications] = React.useState<Certification[]>([]);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    async function loadData() {
      try {
        const [expData, appData, certData] = await Promise.all([
          fetchExperiences(),
          fetchApproach(),
          fetchCertifications(),
        ]);
        if (active) {
          if (expData) {
            const getStartYear = (periodStr: string): number => {
              const match = periodStr.match(/\b(19|20)\d{2}\b/);
              return match ? parseInt(match[0], 10) : 0;
            };
            const sortedExp = [...expData].sort((a, b) => {
              const yearA = getStartYear(a.period);
              const yearB = getStartYear(b.period);
              return yearB - yearA;
            });
            setExperiences(sortedExp);
          }
          if (appData) setApproaches(appData);
          if (certData) setCertifications(certData);
        }
      } catch (err) {
        console.error('Failed loading experience screen data:', err);
      }
    }
    loadData();
    return () => {
      active = false;
    };
  }, []);

  const getApproachIcon = (id: string | number) => {
    switch (String(id)) {
      case '1': return 'analytics' as const;
      case '2': return 'map' as const;
      case '3': return 'git-branch' as const;
      case '4':
      default:
        return 'checkmark-done-circle' as const;
    }
  };

  return (
    <GradientBackground enableSafeArea>
      <SidebarMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topHeader}>
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>DP</Text>
            </View>
            <Text style={styles.logoText}>D. Patel</Text>
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

        {/* SECTION HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>
            My <Text style={{ color: '#a855f7' }}>Experience</Text>
          </Text>
          <Text style={styles.subtitle}>
            Work history, credentials, and structural methods
          </Text>
        </View>

        {/* TIMELINE SECTION */}
        <View style={styles.timelineContainer}>
          {experiences.map((exp, index) => {
            const expTheme = exp.theme || 'purple';
            return (
              <View key={exp._id} style={styles.timelineRow}>
                {/* Timeline Connector Graphic */}
                <View style={styles.timelineLeftColumn}>
                  <View
                    style={[
                      styles.timelineNode,
                      { borderColor: getThemeColor(expTheme) }
                    ]}
                  >
                    <View
                      style={[
                        styles.nodeInner,
                        { backgroundColor: getThemeColor(expTheme) }
                      ]}
                    />
                  </View>
                  {index < experiences.length - 1 && (
                    <View style={styles.timelineLine} />
                  )}
                </View>

                {/* Timeline Card */}
                <GlassCard
                  glowColor={expTheme}
                  style={styles.timelineCard}
                >
                  <Text style={styles.expPeriod}>{exp.period}</Text>
                  <Text style={styles.expTitle}>{exp.title}</Text>
                  <Text
                    style={[
                      styles.expCompany,
                      { color: getThemeColor(expTheme) }
                    ]}
                  >
                    {exp.company}
                  </Text>
                  <Text style={styles.expDesc}>{exp.description}</Text>

                  <View style={styles.techList}>
                    {exp.technologies.map((tech) => (
                      <TechBadge
                        key={tech}
                        name={tech}
                        theme={expTheme}
                      />
                    ))}
                  </View>
                </GlassCard>
              </View>
            );
          })}
        </View>

        {/* CERTIFICATIONS */}
        <View style={styles.sectionDivider}>
          <Text style={styles.sectionTitle}>Certifications</Text>
        </View>

        <View style={styles.certList}>
          {certifications.map((cert) => {
            const certTitle = cert.title || (cert as any).name;
            return (
              <GlassCard key={certTitle} style={styles.certCard} glowColor="none">
                <View style={styles.certIconBg}>
                  <Ionicons name="ribbon" size={20} color="#a855f7" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.certName}>{certTitle}</Text>
                  <Text style={styles.certIssuer}>{cert.issuer}</Text>
                </View>
              </GlassCard>
            );
          })}
        </View>

        {/* APPROACH */}
        <View style={styles.sectionDivider}>
          <Text style={styles.sectionTitle}>
            My <Text style={{ color: '#06b6d4' }}>Approach</Text>
          </Text>
        </View>

        <View style={styles.approachGrid}>
          {approaches.map((app) => (
            <GlassCard key={app.id} style={styles.approachCard} glowColor="cyan">
              <View style={styles.approachHeader}>
                <View style={styles.approachIconWrapper}>
                  <Ionicons name={getApproachIcon(app.id)} size={20} color="#06b6d4" />
                </View>
                <Text style={styles.approachStep}>0{app.id}</Text>
              </View>
              <Text style={styles.approachTitle}>{app.title}</Text>
              <Text style={styles.approachDesc}>{app.description}</Text>
            </GlassCard>
          ))}
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
  header: {
    marginTop: 10,
    marginBottom: 24,
    paddingLeft: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ECEDEE',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#9BA1A6',
    lineHeight: 18,
  },
  timelineContainer: {
    paddingLeft: 4,
    marginBottom: 16,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineLeftColumn: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  timelineNode: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a1a',
    marginTop: 6,
    zIndex: 2,
  },
  nodeInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginTop: -4,
    zIndex: 1,
  },
  timelineCard: {
    flex: 1,
    padding: 16,
  },
  expPeriod: {
    fontSize: 11,
    color: '#9BA1A6',
    fontWeight: '500',
    marginBottom: 6,
  },
  expTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ECEDEE',
    marginBottom: 4,
  },
  expCompany: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },
  expDesc: {
    fontSize: 13,
    color: '#cbd5e1',
    lineHeight: 18,
    marginBottom: 14,
  },
  techList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionDivider: {
    marginTop: 24,
    marginBottom: 16,
    paddingLeft: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ECEDEE',
  },
  certList: {
    gap: 12,
    marginBottom: 16,
  },
  certCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  certIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.2)',
  },
  certName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ECEDEE',
    marginBottom: 2,
  },
  certIssuer: {
    fontSize: 12,
    color: '#9BA1A6',
  },
  approachGrid: {
    gap: 16,
  },
  approachCard: {
    padding: 18,
  },
  approachHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  approachIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
  },
  approachStep: {
    fontSize: 14,
    fontWeight: '800',
    color: 'rgba(6, 182, 212, 0.5)',
  },
  approachTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ECEDEE',
    marginBottom: 6,
  },
  approachDesc: {
    fontSize: 12,
    color: '#9BA1A6',
    lineHeight: 16,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
});
