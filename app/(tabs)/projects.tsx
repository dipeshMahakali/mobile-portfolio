import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { GradientBackground } from '@/components/ui/gradient-background';
import { GlassCard } from '@/components/ui/glass-card';
import { TechBadge } from '@/components/ui/tech-badge';

export default function ProjectsScreen() {
  const projects = [
    {
      id: 1,
      title: "JIA Virtual Assistant",
      description: "An intelligent virtual assistant built with Python, featuring voice recognition, natural language processing, and task automation capabilities.",
      technologies: ["Python", "NLP", "Speech Recog.", "AI", "Automation", "Scraping"],
      github: "https://github.com/starkdipesh/JIA-VIRTUAL-ASSISTANT",
      featured: true,
      glowColor: "cyan" as const,
      metrics: [
        { label: "Accuracy", value: "92%" },
        { label: "Response", value: "<2s" }
      ]
    },
    {
      id: 2,
      title: "Python Mini Projects",
      description: "A collection of innovative Python projects demonstrating various programming concepts, algorithms, and practical applications.",
      technologies: ["Python", "Automation", "Web Scraping", "APIs", "CLI Apps"],
      github: "https://github.com/starkdipesh/pythonMiniProjects",
      featured: true,
      glowColor: "purple" as const,
      metrics: [
        { label: "ProjectsCount", value: "15+" },
        { label: "Stars", value: "⭐" }
      ]
    },
    {
      id: 3,
      title: "Data Science Portfolio",
      description: "Comprehensive data science projects covering machine learning, data analysis, visualization, and predictive modeling.",
      technologies: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Visuals"],
      github: "https://github.com/starkdipesh/Data-Science",
      featured: true,
      glowColor: "blue" as const,
      metrics: [
        { label: "Model Acc.", value: "94%" },
        { label: "Datasets", value: "10+" }
      ]
    }
  ];

  const handleGithubPress = (url: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Linking.openURL(url);
  };

  return (
    <GradientBackground enableSafeArea>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            My <Text style={{ color: '#06b6d4' }}>Projects</Text>
          </Text>
          <Text style={styles.subtitle}>
            A showcase of my recent code, tools, and research
          </Text>
        </View>

        <View style={styles.list}>
          {projects.map((project) => (
            <GlassCard
              key={project.id}
              glowColor={project.glowColor}
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <View style={styles.titleWrapper}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  {project.featured && (
                    <View style={styles.featuredBadge}>
                      <Text style={styles.featuredBadgeText}>FEATURED</Text>
                    </View>
                  )}
                </View>
                <Ionicons
                  name="folder-open-outline"
                  size={20}
                  color={
                    project.glowColor === 'cyan' ? '#06b6d4' :
                    project.glowColor === 'purple' ? '#a855f7' : '#3b82f6'
                  }
                />
              </View>

              <Text style={styles.description}>{project.description}</Text>

              {/* Technologies BADGES */}
              <View style={styles.techContainer}>
                {project.technologies.map((tech) => (
                  <TechBadge
                    key={tech}
                    name={tech}
                    theme={
                      project.glowColor === 'cyan' ? 'cyan' :
                      project.glowColor === 'purple' ? 'purple' : 'blue'
                    }
                  />
                ))}
              </View>

              {/* PROJECT METRICS */}
              <View style={styles.metricsWrapper}>
                {project.metrics.map((metric) => (
                  <View key={metric.label} style={styles.metricBlock}>
                    <Text style={styles.metricLabel}>{metric.label}</Text>
                    <Text style={styles.metricValue}>{metric.value}</Text>
                  </View>
                ))}
              </View>

              {/* REDIRECTION ACTION */}
              <Pressable
                onPress={() => handleGithubPress(project.github)}
                style={({ pressed }) => [
                  styles.githubButton,
                  {
                    backgroundColor:
                      project.glowColor === 'cyan' ? 'rgba(6, 182, 212, 0.1)' :
                      project.glowColor === 'purple' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                    borderColor:
                      project.glowColor === 'cyan' ? 'rgba(6, 182, 212, 0.3)' :
                      project.glowColor === 'purple' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.3)',
                  },
                  pressed && { transform: [{ scale: 0.97 }], opacity: 0.8 }
                ]}
              >
                <Ionicons name="logo-github" size={16} color="#fff" style={{ marginRight: 6 }} />
                <Text style={styles.githubButtonText}>View Source Code</Text>
                <Ionicons name="chevron-forward" size={14} color="#9BA1A6" style={{ marginLeft: 'auto' }} />
              </Pressable>
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
  list: {
    gap: 20,
  },
  card: {
    padding: 22,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ECEDEE',
  },
  featuredBadge: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderWidth: 1,
    borderColor: '#06b6d4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  featuredBadgeText: {
    color: '#22d3ee',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 13,
    color: '#cbd5e1',
    lineHeight: 18,
    marginBottom: 16,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  metricsWrapper: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 14,
    marginBottom: 16,
    gap: 24,
  },
  metricBlock: {
    flexDirection: 'column',
  },
  metricLabel: {
    fontSize: 10,
    color: '#9BA1A6',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ECEDEE',
  },
  githubButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  githubButtonText: {
    color: '#ECEDEE',
    fontSize: 13,
    fontWeight: '600',
  },
});
