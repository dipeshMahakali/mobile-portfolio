import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Linking,
  Alert,
  Platform,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { GradientBackground } from '@/components/ui/gradient-background';
import { GlassCard } from '@/components/ui/glass-card';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 40;

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [focusedField, setFocusedField] = useState<'name' | 'email' | 'message' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      position: "Senior Python Developer",
      company: "Tech Solutions Inc.",
      content: "Dipesh demonstrates exceptional problem-solving skills and a deep understanding of Python development. His AI projects showcase creativity and technical excellence.",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Patel",
      position: "IoT Project Lead",
      company: "Innovation Labs",
      content: "Working with Dipesh on IoT projects has been fantastic. His ability to integrate hardware and software solutions is impressive, and his dedication to learning is inspiring.",
      rating: 5
    },
    {
      id: 3,
      name: "Amit Kumar",
      position: "Data Science Manager",
      company: "Analytics Pro",
      content: "Dipesh's data science portfolio reflects strong analytical thinking and proficiency in Python libraries. His approach to machine learning problems is methodical and innovative.",
      rating: 5
    },
    {
      id: 4,
      name: "Neha Gupta",
      position: "Software Architect",
      company: "Digital Innovations",
      content: "The virtual assistant project by Dipesh shows remarkable understanding of NLP and AI concepts. His code quality and documentation are commendable.",
      rating: 5
    }
  ];

  const socialLinks = {
    email: "dipesh.patel1902@gmail.com",
    phone: "8319821606",
    github: "https://github.com/starkdipesh",
    linkedin: "https://linkedin.com/in/dipeshpatel",
    twitter: "https://twitter.com/dipeshpatel"
  };

  const handleSend = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Missing Fields", "Please complete the form before sending.");
      return;
    }

    setIsSubmitting(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert(
        "Message Sent!",
        `Thank you ${name}, your message has been recorded. I'll get back to you shortly!`,
        [{ text: "OK", onPress: () => {
          setName('');
          setEmail('');
          setMessage('');
        }}]
      );
    }, 1500);
  };

  const handleLink = (url: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(url);
  };

  return (
    <GradientBackground enableSafeArea>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Get in <Text style={{ color: '#06b6d4' }}>Touch</Text>
          </Text>
          <Text style={styles.subtitle}>
            Let's discuss automated, neural, or custom IoT integrations
          </Text>
        </View>

        {/* CONTACT FORM */}
        <GlassCard glowColor="cyan" style={styles.formCard}>
          <Text style={styles.formTitle}>Send a Message</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'name' && styles.inputFocused
              ]}
              placeholder="Your Name"
              placeholderTextColor="#687076"
              value={name}
              onChangeText={setName}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'email' && styles.inputFocused
              ]}
              placeholder="your.email@example.com"
              placeholderTextColor="#687076"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                focusedField === 'message' && styles.inputFocused
              ]}
              placeholder="How can I help you?"
              placeholderTextColor="#687076"
              value={message}
              onChangeText={setMessage}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <Pressable
            onPress={handleSend}
            disabled={isSubmitting}
            style={({ pressed }) => [
              styles.submitButton,
              pressed && { transform: [{ scale: 0.97 }] },
              isSubmitting && { opacity: 0.7 }
            ]}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? "Sending..." : "Submit Inquiry"}
            </Text>
            <Ionicons name="paper-plane" size={16} color="#fff" style={{ marginLeft: 6 }} />
          </Pressable>
        </GlassCard>

        {/* TESTIMONIALS SLIDER */}
        <View style={styles.sectionDivider}>
          <Text style={styles.sectionTitle}>
            Endorsements
          </Text>
          <Text style={styles.sectionSubtitle}>
            What my supervisors & colleagues say
          </Text>
        </View>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 16}
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={styles.testimonialSlider}
        >
          {testimonials.map((t) => (
            <GlassCard key={t.id} style={styles.testimonialCard} glowColor="purple">
              <View style={styles.testimonialHeader}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarLetter}>{t.name[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.testimonialName}>{t.name}</Text>
                  <Text style={styles.testimonialRole}>
                    {t.position} @ <Text style={{ color: '#a855f7' }}>{t.company}</Text>
                  </Text>
                </View>
              </View>

              <Text style={styles.testimonialContent}>"{t.content}"</Text>

              <View style={styles.ratingRow}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Ionicons key={i} name="star" size={14} color="#eab308" />
                ))}
              </View>
            </GlassCard>
          ))}
        </ScrollView>

        {/* SOCIAL NETWORKS */}
        <View style={styles.sectionDivider}>
          <Text style={styles.sectionTitle}>
            Connect <Text style={{ color: '#06b6d4' }}>Online</Text>
          </Text>
          <Text style={styles.sectionSubtitle}>
            Direct shortcuts to active professional profiles
          </Text>
        </View>

        <View style={styles.socialNetworkCard}>
          <GlassCard style={styles.networkInner} glowColor="cyan">
            <View style={styles.socialGrid}>
              <Pressable
                onPress={() => handleLink(`mailto:${socialLinks.email}`)}
                style={styles.socialButton}
              >
                <View style={[styles.socialIconWrapper, { backgroundColor: 'rgba(6, 182, 212, 0.1)' }]}>
                  <Ionicons name="mail" size={20} color="#06b6d4" />
                </View>
                <Text style={styles.socialButtonLabel}>Email</Text>
              </Pressable>

              <Pressable
                onPress={() => handleLink(socialLinks.linkedin)}
                style={styles.socialButton}
              >
                <View style={[styles.socialIconWrapper, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                  <Ionicons name="logo-linkedin" size={20} color="#3b82f6" />
                </View>
                <Text style={styles.socialButtonLabel}>LinkedIn</Text>
              </Pressable>

              <Pressable
                onPress={() => handleLink(socialLinks.github)}
                style={styles.socialButton}
              >
                <View style={[styles.socialIconWrapper, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
                  <Ionicons name="logo-github" size={20} color="#fff" />
                </View>
                <Text style={styles.socialButtonLabel}>GitHub</Text>
              </Pressable>

              <Pressable
                onPress={() => handleLink(socialLinks.twitter)}
                style={styles.socialButton}
              >
                <View style={[styles.socialIconWrapper, { backgroundColor: 'rgba(168, 85, 247, 0.1)' }]}>
                  <Ionicons name="logo-twitter" size={20} color="#a855f7" />
                </View>
                <Text style={styles.socialButtonLabel}>Twitter</Text>
              </Pressable>
            </View>
          </GlassCard>
        </View>

        <View style={{ height: Platform.OS === 'ios' ? 120 : 100 }} />
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
  formCard: {
    padding: 24,
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ECEDEE',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#9BA1A6',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    color: '#ECEDEE',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
  },
  inputFocused: {
    borderColor: '#06b6d4',
    backgroundColor: 'rgba(6, 182, 212, 0.03)',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06b6d4',
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 8,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
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
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#9BA1A6',
  },
  testimonialSlider: {
    paddingLeft: 4,
    paddingRight: 20,
    gap: 16,
    marginBottom: 16,
  },
  testimonialCard: {
    width: CARD_WIDTH,
    padding: 20,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#a855f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarLetter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  testimonialName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ECEDEE',
  },
  testimonialRole: {
    fontSize: 11,
    color: '#9BA1A6',
    fontWeight: '500',
    marginTop: 1,
  },
  testimonialContent: {
    fontSize: 13,
    color: '#cbd5e1',
    lineHeight: 18,
    fontStyle: 'italic',
    marginBottom: 14,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 4,
  },
  socialNetworkCard: {
    marginBottom: 16,
  },
  networkInner: {
    padding: 16,
  },
  socialGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
  },
  socialButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 8,
  },
  socialButtonLabel: {
    fontSize: 11,
    color: '#cbd5e1',
    fontWeight: '600',
  },
});
