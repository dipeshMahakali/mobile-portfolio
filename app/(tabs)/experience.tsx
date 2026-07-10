import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { GlassCard } from '@/components/ui/glass-card';
import { GradientBackground } from '@/components/ui/gradient-background';
import { TechBadge } from '@/components/ui/tech-badge';

const getThemeColor = (theme: 'cyan' | 'purple' | 'blue') => {
  switch (theme) {
    case 'cyan':
      return '#06b6d4';
    case 'blue':
      return '#3b82f6';
    case 'purple':
    default:
      return '#a855f7';
  }
};

export default function ExperienceScreen() {
  const experiences = [
    {
      id: 1,
      title: "Jr. Software Developer",
      company: "Shree Mahakali Software Pvt Ltd.",
      period: "Jan 2026 - Present",
      description: "Working as a Jr. Software Developer at Shree Mahakali Software Pvt Ltd., contributing in the development of web applications and systems.",
      technologies: ["HTML", "CSS", "JS", "Python", "Django", "Databases", "Laravel", "jQuery", "GitLab"],
      theme: "blue" as const,
    },
    {
      id: 2,
      title: "Web Development Training",
      company: "Shree Mahakali Software Pvt Ltd.",
      period: "Jun 2025 - Dec 2025",
      description: "Completed comprehensive web development training covering frontend and backend technologies, database management, and modern development practices.",
      technologies: ["HTML", "CSS", "JS", "Python", "Django", "Databases", "Laravel", "jQuery", "GitLab"],
      theme: "cyan" as const,
    },
    {
      id: 3,
      title: "Data Analysis Internship",
      company: "Deloitte Virtual Internship",
      period: "May 2025",
      description: "Analyzed and visualized manufacturing telemetry data using Python, Excel, and Tableau during the Deloitte Data Analytics Virtual Internship to drive operational efficiency and inform business strategy.",
      technologies: ["Data Prep", "Excel", "Python", "Pandas", "NumPy", "Visuals", "Telemetry"],
      theme: "purple" as const,
    }
  ];

  const approaches = [
    {
      id: 1,
      title: "Problem Analysis",
      description: "Deep dive into understanding requirements, constraints, and operational telemetry before coding.",
      icon: "analytics" as const,
    },
    {
      id: 2,
      title: "Research & Plan",
      description: "Thorough technology evaluations and database planning to design optimal, low-memory systems.",
      icon: "map" as const,
    },
    {
      id: 3,
      title: "Iterative Dev",
      description: "Building incrementally with test-driven profiles and seamless modular integrations.",
      icon: "git-branch" as const,
    },
    {
      id: 4,
      title: "Quality Assurance",
      description: "Rigorous diagnostic testing, code refactors, and performance analysis for high-FPS operations.",
      icon: "checkmark-done-circle" as const,
    }
  ];

  const certifications = [
    { name: "Deloitte Data Analytics", issuer: "Deloitte Virtual" },
    { name: "Full Stack Development", issuer: "Shree Mahakali Software" },
    { name: "Python Automation", issuer: "Tech Solutions" },
  ];

  return (
    <GradientBackground enableSafeArea>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
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
          {experiences.map((exp, index) => (
            <View key={exp.id} style={styles.timelineRow}>
              {/* Timeline Connector Graphic */}
              <View style={styles.timelineLeftColumn}>
                <View
                  style={[
                    styles.timelineNode,
                    { borderColor: getThemeColor(exp.theme) }
                  ]}
                >
                  <View
                    style={[
                      styles.nodeInner,
                      { backgroundColor: getThemeColor(exp.theme) }
                    ]}
                  />
                </View>
                {index < experiences.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>

              {/* Timeline Card */}
              <GlassCard
                glowColor={exp.theme}
                style={styles.timelineCard}
              >
                <Text style={styles.expPeriod}>{exp.period}</Text>
                <Text style={styles.expTitle}>{exp.title}</Text>
                <Text
                  style={[
                    styles.expCompany,
                    { color: getThemeColor(exp.theme) }
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
                      theme={exp.theme}
                    />
                  ))}
                </View>
              </GlassCard>
            </View>
          ))}
        </View>

        {/* CERTIFICATIONS */}
        <View style={styles.sectionDivider}>
          <Text style={styles.sectionTitle}>Certifications</Text>
        </View>

        <View style={styles.certList}>
          {certifications.map((cert) => (
            <GlassCard key={cert.name} style={styles.certCard} glowColor="none">
              <View style={styles.certIconBg}>
                <Ionicons name="ribbon" size={20} color="#a855f7" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.certName}>{cert.name}</Text>
                <Text style={styles.certIssuer}>{cert.issuer}</Text>
              </View>
            </GlassCard>
          ))}
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
                  <Ionicons name={app.icon} size={20} color="#06b6d4" />
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
});
