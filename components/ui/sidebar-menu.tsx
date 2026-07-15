import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useSegments } from 'expo-router';
import { GlassCard } from './glass-card';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
  const segments = useSegments();

  const menuItems = [
    {
      label: 'Welcome Gate',
      route: '/',
      icon: 'sparkles-outline' as const,
      color: '#f97316',
    },
    {
      label: 'Home Dashboard',
      route: '/(tabs)/home',
      icon: 'grid-outline' as const,
      color: '#06b6d4',
    },
    {
      label: 'Projects Catalog',
      route: '/(tabs)/projects',
      icon: 'code-slash-outline' as const,
      color: '#3b82f6',
    },
    {
      label: 'Experience Timeline',
      route: '/(tabs)/experience',
      icon: 'briefcase-outline' as const,
      color: '#a855f7',
    },
    {
      label: 'Contact Channels',
      route: '/(tabs)/contact',
      icon: 'mail-unread-outline' as const,
      color: '#eab308',
    },
  ];

  const handleNavigation = (route: string) => {
    onClose();
    // Use timeout to let the modal close smoothly before navigating
    setTimeout(() => {
      if (route === '/') {
        router.replace('/');
      } else {
        router.replace(route as any);
      }
    }, 150);
  };

  const isActive = (route: string) => {
    if (route === '/') {
      // Welcome Gate is active only when not inside the tabs route group
      return !segments.includes('(tabs)');
    }
    if (route === '/(tabs)/home') {
      // Home Dashboard is active when inside tabs and currently on the home screen
      return segments.includes('(tabs)') && (segments.includes('home') || segments.length === 1);
    }
    // For other tabs:
    const baseTab = route.split('/').pop() || '';
    return segments.includes('(tabs)') && segments.includes(baseTab);
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Backdrop press to close */}
        <Pressable style={styles.backdrop} onPress={onClose} />

        {/* Slide-out Sidebar container */}
        <View style={styles.sidebarContainer}>
          <GlassCard style={styles.sidebarInner} glowColor="purple">
            {/* Header / Brand */}
            <View style={styles.sidebarHeader}>
              <View style={styles.brandContainer}>
                <View style={styles.logoBadge}>
                  <Text style={styles.logoBadgeText}>DP</Text>
                </View>
                <Text style={styles.brandText}>D. Patel</Text>
              </View>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#9BA1A6" />
              </Pressable>
            </View>

            <Text style={styles.menuTitle}>Navigation Matrix</Text>

            {/* Menu Links */}
            <View style={styles.menuList}>
              {menuItems.map((item) => {
                const active = isActive(item.route);
                return (
                  <Pressable
                    key={item.label}
                    onPress={() => handleNavigation(item.route)}
                    style={({ pressed }) => [
                      styles.menuItem,
                      active && styles.menuItemActive,
                      pressed && styles.menuItemPressed,
                    ]}
                  >
                    <View
                      style={[
                        styles.iconWrapper,
                        { backgroundColor: active ? `${item.color}20` : 'rgba(255,255,255,0.03)' },
                      ]}
                    >
                      <Ionicons
                        name={item.icon}
                        size={20}
                        color={active ? item.color : '#cbd5e1'}
                      />
                    </View>
                    <Text
                      style={[
                        styles.menuItemLabel,
                        active && { color: item.color, fontWeight: '700' },
                      ]}
                    >
                      {item.label}
                    </Text>
                    {active && (
                      <View style={[styles.activeIndicator, { backgroundColor: item.color }]} />
                    )}
                  </Pressable>
                );
              })}
            </View>

            {/* Sidebar Footer */}
            <View style={styles.sidebarFooter}>
              <Text style={styles.footerTech}>ROBOTICS • AI • GAME DEV</Text>
              <Text style={styles.footerVersion}>v1.2.0 • Dynamic Core</Text>
            </View>
          </GlassCard>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(5, 5, 12, 0.65)',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  sidebarContainer: {
    width: Math.min(SCREEN_WIDTH * 0.78, 300),
    height: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: -5, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  sidebarInner: {
    flex: 1,
    height: '100%',
    borderRadius: 0,
    borderWidth: 0,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(10, 10, 26, 0.96)',
    paddingTop: Platform.OS === 'ios' ? 60 : 35,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  brandText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  closeButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  menuTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9BA1A6',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  menuList: {
    flex: 1,
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'transparent',
    gap: 14,
  },
  menuItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(255,255,255,0.06)',
  },
  menuItemPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemLabel: {
    fontSize: 14,
    color: '#cbd5e1',
    fontWeight: '500',
    flex: 1,
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sidebarFooter: {
    paddingVertical: 25,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    gap: 4,
  },
  footerTech: {
    fontSize: 10,
    fontWeight: '800',
    color: '#9BA1A6',
    letterSpacing: 1.2,
  },
  footerVersion: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.25)',
  },
});
