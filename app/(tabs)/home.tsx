import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
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

import { GlassCard } from '@/components/ui/glass-card';
import { GradientBackground } from '@/components/ui/gradient-background';
import { SidebarMenu } from '@/components/ui/sidebar-menu';
import { TechBadge } from '@/components/ui/tech-badge';
import { SkeletonProjectCard, SkeletonSkillCard, SkeletonActivityCard } from '@/components/ui/wavy-skeleton';
import { CONFIG } from '@/constants/config';
import {
  fetchPersonalInfo,
  fetchProjects,
  fetchSkills,
  fetchGithubActivity,
  PersonalInfo,
  Project,
  Skill,
  GithubActivity,
} from '@/services/api';

export default function HomeScreen() {
  const [info, setInfo] = React.useState<PersonalInfo>(CONFIG.personalInfo);
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [skills, setSkills] = React.useState<Skill[]>([]);
  const [activities, setActivities] = React.useState<GithubActivity[]>([]);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    async function loadData() {
      setLoading(true);
      const startTime = Date.now();
      try {
        const infoData = await fetchPersonalInfo();
        const username = infoData?.github ? infoData.github.split('/').pop() || 'starkdipesh' : 'starkdipesh';
        const [projectsData, skillsData, activityData] = await Promise.all([
          fetchProjects(),
          fetchSkills(),
          fetchGithubActivity(username),
        ]);
        const elapsedTime = Date.now() - startTime;
        const delay = Math.max(0, 300 - elapsedTime);
        await new Promise((resolve) => setTimeout(resolve, delay));
        if (active) {
          if (infoData) setInfo(infoData);
          if (projectsData) {
            const featured = projectsData.filter((p: Project) => p.featured);
            setProjects(featured);
          }
          if (skillsData) setSkills(skillsData);
          if (activityData) setActivities(activityData);
        }
      } catch (err) {
        console.error('Failed loading home screen data:', err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }
    loadData();
    return () => {
      active = false;
    };
  }, []);

  const getProjectThumbnail = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('jia') || lower.includes('assistant') || lower.includes('virtual')) {
      return require('@/assets/images/brain-chip-circuit.png');
    }
    if (lower.includes('science') || lower.includes('data')) {
      return require('@/assets/images/react-logo.png');
    }
    return require('@/assets/images/partial-react-logo.png');
  };

  const handleSocialPress = (url: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(url);
  };

  const handleMoreAboutMePress = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push('/(tabs)/experience');
  };

  const handleProjectPress = (url: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(url);
  };

  const socials = [
    {
      name: "GitHub",
      url: info.github || CONFIG.personalInfo.github,
      label: "Follow Me",
      icon: "logo-github" as const,
      color: "#06b6d4",
    },
    {
      name: "LinkedIn",
      url: info.linkedin || CONFIG.personalInfo.linkedin,
      label: "See My Work",
      icon: "logo-linkedin" as const,
      color: "#a855f7",
    },
    {
      name: "Email",
      url: info.email ? `mailto:${info.email}` : `mailto:${CONFIG.personalInfo.email}`,
      label: "Contact",
      icon: "mail-outline" as const,
      color: "#3b82f6",
    }
  ];

  const shortName = info.shortName || CONFIG.personalInfo.shortName;
  const firstName = info.firstName || CONFIG.personalInfo.firstName;
  const title = info.title || CONFIG.personalInfo.title;
  const specialtyTitle = CONFIG.personalInfo.specialtyTitle;
  const specialtySubtitle = CONFIG.personalInfo.specialtySubtitle;
  const description = info.description || CONFIG.personalInfo.description;

  return (
    <GradientBackground enableSafeArea>
      <SidebarMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
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

        {/* TOP BANNER */}
        <GlassCard style={styles.bannerCard} glowColor="cyan">
          <View style={styles.bannerContent}>
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerSignature}>{"I'm "}{firstName}</Text>
              <Text style={styles.bannerSubtitle}>{title}</Text>
            </View>
            <Image
              source={require('@/assets/images/royal-avatar.png')}
              style={styles.bannerAvatar}
              contentFit="cover"
              transition={300}
            />
          </View>
        </GlassCard>

        {/* SOCIAL LINKS (HORIZONTAL BAR) */}
        <View style={styles.socialBar}>
          {socials.map((social) => (
            <Pressable
              key={social.name}
              onPress={() => handleSocialPress(social.url)}
              style={({ pressed }) => [
                styles.socialItem,
                { borderColor: social.color + '33' },
                pressed && { transform: [{ scale: 0.96 }], backgroundColor: 'rgba(255,255,255,0.04)' }
              ]}
            >
              <Ionicons name={social.icon} size={18} color={social.color} />
              <View style={styles.socialLabelCol}>
                <Text style={[styles.socialNameText, { color: social.color }]}>{social.name}</Text>
                <Text style={styles.socialLinkLabel}>{social.label}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* INTRO SUMMARY */}
        <View style={styles.introSection}>
          <Text style={styles.introPre}>{specialtyTitle}</Text>
          <Text style={styles.introMain}>{specialtySubtitle}</Text>
          <Text style={styles.introBody}>{description}</Text>

          <Pressable
            onPress={handleMoreAboutMePress}
            style={({ pressed }) => [
              styles.moreAboutButton,
              pressed && { transform: [{ scale: 0.96 }] }
            ]}
          >
            <Text style={styles.moreAboutButtonText}>More about Me</Text>
          </Pressable>
        </View>

        {/* CORE SKILLS MATRIX */}
        {(loading || skills.length > 0) && (
          <View style={styles.sectionDivider}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitlePre}>Core Capabilities,</Text>
              <Text style={styles.sectionTitleMain}>Skills & Expertise</Text>
            </View>
            <View style={styles.skillsGrid}>
              {loading ? (
                [0, 1, 2, 3].map((_, index) => (
                  <SkeletonSkillCard key={index} style={styles.skillCard} />
                ))
              ) : (
                skills.map((skill) => (
                  <GlassCard key={skill.name} style={styles.skillCard} glowColor="cyan">
                    <View style={styles.skillHeader}>
                      <Text style={styles.skillName} numberOfLines={1}>{skill.name}</Text>
                      <Text style={styles.skillLevel}>{skill.level}%</Text>
                    </View>
                    <View style={styles.progressBg}>
                      <View style={[styles.progressFill, { width: `${skill.level}%` }]} />
                    </View>
                  </GlassCard>
                ))
              )}
            </View>
          </View>
        )}

        {/* GITHUB ACTIVITY FEED */}
        {(loading || activities.length > 0) && (
          <View style={styles.sectionDivider}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitlePre}>Live Developer Log,</Text>
              <Text style={styles.sectionTitleMain}>GitHub Timeline</Text>
            </View>
            {loading ? (
              <SkeletonActivityCard style={styles.activityCard} />
            ) : (
              <GlassCard style={styles.activityCard} glowColor="purple">
                {activities.map((act, idx) => (
                  <View key={idx} style={[styles.activityRow, idx > 0 && styles.activityDivider]}>
                    <View style={styles.activityDotCol}>
                      <View style={styles.activityDot} />
                      {idx < activities.length - 1 && <View style={styles.activityLine} />}
                    </View>
                    <View style={styles.activityTextCol}>
                      <View style={styles.activityMetaRow}>
                        <Text style={styles.activityRepo} numberOfLines={1}>{act.repo}</Text>
                        <Text style={styles.activityDate}>{act.date}</Text>
                      </View>
                      <Text style={styles.activityMsg}>{act.message}</Text>
                    </View>
                  </View>
                ))}
              </GlassCard>
            )}
          </View>
        )}

        {/* SELECTED PROJECTS HEADER */}
        <View style={styles.projectsHeader}>
          <Text style={styles.projectsTitlePre}>All Creative Works,</Text>
          <Text style={styles.projectsTitleMain}>Selected Projects</Text>
          <Text style={styles.projectsSubtitle}>
            {"It's time to see some work. Here are a few projects, codebases, and tool integrations I've built."}
          </Text>
        </View>

        {/* FEATURED PROJECTS LIST */}
        <View style={styles.projectsList}>
          {loading ? (
            [0, 1].map((_, index) => (
              <SkeletonProjectCard key={index} glowColor="none" style={styles.projectItemCard} />
            ))
          ) : (
            projects.map((project) => (
              <GlassCard
                key={project._id}
                style={styles.projectItemCard}
                glowColor="none"
              >
                <View style={styles.projectCardContent}>
                  <View style={styles.projectTextCol}>
                    <Text style={styles.projectCardTitle}>{project.title}</Text>
                    <Text style={styles.projectCardDesc}>{project.description}</Text>
                    <View style={styles.projectBadgesRow}>
                      {project.technologies.map((t) => (
                        <TechBadge key={t} name={t} theme="cyan" />
                      ))}
                    </View>
                    <Pressable
                      onPress={() => handleProjectPress(project.github)}
                      style={styles.seeMoreLink}
                    >
                      <Text style={styles.seeMoreText}>See More</Text>
                      <Ionicons name="arrow-forward" size={12} color="#06b6d4" />
                    </Pressable>
                  </View>
                  <View style={styles.projectImageCol}>
                    <View style={styles.projectImageFrame}>
                      <Image
                        source={getProjectThumbnail(project.title)}
                        style={styles.projectThumbnail}
                        contentFit="contain"
                      />
                    </View>
                  </View>
                </View>
              </GlassCard>
            ))
          )}
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
  bannerCard: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(249, 115, 22, 0.12)',
    borderColor: 'rgba(249, 115, 22, 0.25)',
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  bannerSignature: {
    color: '#f97316',
    fontSize: 22,
    fontStyle: 'italic',
    fontWeight: '700',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: '#9BA1A6',
    fontSize: 12,
    fontWeight: '600',
  },
  bannerAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#f97316',
  },
  socialBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 24,
  },
  socialItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(21, 23, 24, 0.5)',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 14,
  },
  socialLabelCol: {
    flex: 1,
  },
  socialNameText: {
    fontSize: 11,
    fontWeight: '700',
  },
  socialLinkLabel: {
    color: '#9BA1A6',
    fontSize: 8,
    fontWeight: '500',
    marginTop: 1,
  },
  introSection: {
    marginBottom: 28,
  },
  introPre: {
    color: '#f97316',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  introMain: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
  },
  introBody: {
    color: '#9BA1A6',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  moreAboutButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#f97316',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  moreAboutButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  projectsHeader: {
    marginBottom: 16,
  },
  projectsTitlePre: {
    color: '#f97316',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  projectsTitleMain: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  projectsSubtitle: {
    color: '#9BA1A6',
    fontSize: 12,
    lineHeight: 16,
  },
  projectsList: {
    gap: 16,
  },
  projectItemCard: {
    padding: 16,
    backgroundColor: 'rgba(21, 23, 24, 0.45)',
  },
  projectCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  projectTextCol: {
    flex: 1,
  },
  projectCardTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  projectCardDesc: {
    color: '#9BA1A6',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 10,
  },
  projectBadgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  seeMoreLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  seeMoreText: {
    color: '#06b6d4',
    fontSize: 12,
    fontWeight: '700',
  },
  projectImageCol: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectImageFrame: {
    width: 74,
    height: 74,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  projectThumbnail: {
    width: '100%',
    height: '100%',
  },
  sectionDivider: {
    marginBottom: 28,
  },
  sectionHeader: {
    marginBottom: 14,
  },
  sectionTitlePre: {
    color: '#f97316',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  sectionTitleMain: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  skillsGrid: {
    gap: 12,
  },
  skillCard: {
    padding: 14,
    backgroundColor: 'rgba(21, 23, 24, 0.45)',
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    paddingRight: 10,
  },
  skillLevel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#06b6d4',
  },
  progressBg: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#06b6d4',
    borderRadius: 2,
  },
  activityCard: {
    padding: 16,
    backgroundColor: 'rgba(21, 23, 24, 0.45)',
  },
  activityRow: {
    flexDirection: 'row',
    gap: 12,
  },
  activityDivider: {
    marginTop: 12,
    paddingTop: 12,
  },
  activityDotCol: {
    alignItems: 'center',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#a855f7',
    marginTop: 4,
  },
  activityLine: {
    width: 1,
    flex: 1,
    backgroundColor: 'rgba(168, 85, 247, 0.25)',
    marginTop: 4,
    marginBottom: -16,
  },
  activityTextCol: {
    flex: 1,
  },
  activityMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  activityRepo: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    paddingRight: 8,
  },
  activityDate: {
    fontSize: 9,
    fontWeight: '600',
    color: '#9BA1A6',
  },
  activityMsg: {
    fontSize: 11,
    color: '#cbd5e1',
    lineHeight: 15,
  },
});
