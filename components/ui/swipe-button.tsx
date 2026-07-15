import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  LayoutChangeEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface SwipeButtonProps {
  onSwipeSuccess: () => void;
  title?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;        // Default state color (e.g. orange, cyan)
  activeColor?: string;  // Completed state color (e.g. green, blue)
  style?: any;
}

export function SwipeButton({
  onSwipeSuccess,
  title = 'Swipe to Call',
  icon = 'call',
  color = '#f97316',
  activeColor = '#22c55e',
  style,
}: SwipeButtonProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const pan = useRef(new Animated.Value(0)).current;

  // Arrow opacity values for the wave effect
  const arrow1Opacity = useRef(new Animated.Value(0.3)).current;
  const arrow2Opacity = useRef(new Animated.Value(0.3)).current;
  const arrow3Opacity = useRef(new Animated.Value(0.3)).current;

  const THUMB_SIZE = 44;
  const PADDING = 4;

  useEffect(() => {
    // Helper function to create sequential timing animations
    const createArrowAnimation = (arrowVal: Animated.Value, delay: number) => {
      return Animated.sequence([
        Animated.delay(delay),
        Animated.timing(arrowVal, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(arrowVal, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }),
      ]);
    };

    // Staggered loop for arrow wave shimmer effect
    const waveAnimation = Animated.loop(
      Animated.parallel([
        createArrowAnimation(arrow1Opacity, 0),
        createArrowAnimation(arrow2Opacity, 150),
        createArrowAnimation(arrow3Opacity, 300),
      ])
    );

    waveAnimation.start();

    return () => {
      waveAnimation.stop();
    };
  }, [arrow1Opacity, arrow2Opacity, arrow3Opacity]);

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  // Max distance the slider thumb can move
  const maxSwipeDistance = Math.max(0, containerWidth - THUMB_SIZE - PADDING * 2);

  // Keep a ref to the latest maxSwipeDistance to avoid stale closures in PanResponder
  const maxDistanceRef = useRef(0);
  maxDistanceRef.current = maxSwipeDistance;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      },
      onPanResponderMove: (_, gestureState) => {
        const maxDist = maxDistanceRef.current;
        // Limit movement to the right, between 0 and maxDist
        const newX = Math.max(0, Math.min(gestureState.dx, maxDist));
        pan.setValue(newX);
      },
      onPanResponderRelease: (_, gestureState) => {
        const maxDist = maxDistanceRef.current;
        // If swiped past 80% of the maximum track width, trigger completion
        if (gestureState.dx >= maxDist * 0.8) {
          // Slide all the way to the end smoothly
          Animated.timing(pan, {
            toValue: maxDist,
            duration: 120,
            useNativeDriver: false,
          }).start(() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            onSwipeSuccess();
            // Reset position back to start after a small delay
            setTimeout(() => {
              Animated.spring(pan, {
                toValue: 0,
                friction: 8,
                tension: 40,
                useNativeDriver: false,
              }).start();
            }, 800);
          });
        } else {
          // Spring back to the start position if let go too early
          Animated.spring(pan, {
            toValue: 0,
            friction: 8,
            tension: 40,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  // Fade out text as the user swipes right
  const textOpacity = pan.interpolate({
    inputRange: [0, Math.max(1, maxSwipeDistance * 0.6), Math.max(1, maxSwipeDistance)],
    outputRange: [1, 0.4, 0],
    extrapolate: 'clamp',
  });

  // Interpolate border color from subtle white to active state color
  const animatedBorderColor = pan.interpolate({
    inputRange: [0, Math.max(1, maxSwipeDistance)],
    outputRange: ['rgba(255, 255, 255, 0.08)', activeColor],
    extrapolate: 'clamp',
  });

  // Interpolate track background color to active color tint
  const animatedBackgroundColor = pan.interpolate({
    inputRange: [0, Math.max(1, maxSwipeDistance)],
    outputRange: ['rgba(255, 255, 255, 0.04)', `${activeColor}12`],
    extrapolate: 'clamp',
  });

  // Interpolate active fill background color that trails behind the swiped thumb
  const animatedFillColor = pan.interpolate({
    inputRange: [0, Math.max(1, maxSwipeDistance)],
    outputRange: [`${color}15`, `${activeColor}30`],
    extrapolate: 'clamp',
  });

  // Interpolate thumb color from color to activeColor
  const animatedThumbColor = pan.interpolate({
    inputRange: [0, Math.max(1, maxSwipeDistance)],
    outputRange: [color, activeColor],
    extrapolate: 'clamp',
  });

  // Calculate width of the active fill block following the thumb
  const activeFillWidth = Animated.add(pan, THUMB_SIZE + PADDING);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderColor: animatedBorderColor,
          backgroundColor: animatedBackgroundColor,
        },
        style,
      ]}
      onLayout={handleLayout}
    >
      {/* Dynamic Active Color Fill following the thumb */}
      <Animated.View
        style={[
          styles.activeFill,
          {
            width: activeFillWidth,
            backgroundColor: animatedFillColor,
          },
        ]}
      />

      <View style={styles.track}>
        {/* Animated track text */}
        <Animated.View style={[styles.textWrapper, { opacity: textOpacity }]}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.chevronRow}>
            <Animated.View style={{ opacity: arrow1Opacity }}>
              <Ionicons name="chevron-forward" size={14} color="#fff" />
            </Animated.View>
            <Animated.View style={{ opacity: arrow2Opacity, marginLeft: -6 }}>
              <Ionicons name="chevron-forward" size={14} color="#fff" />
            </Animated.View>
            <Animated.View style={{ opacity: arrow3Opacity, marginLeft: -6 }}>
              <Ionicons name="chevron-forward" size={14} color="#fff" />
            </Animated.View>
          </View>
        </Animated.View>

        {/* Swipe Button Thumb */}
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: animatedThumbColor,
              transform: [{ translateX: pan }],
              shadowColor: animatedThumbColor,
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Ionicons name={icon} size={20} color="#fff" />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  activeFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 25,
  },
  track: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 4,
    elevation: 6,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 36, // Shift content right so it's not hidden behind the thumb
  },
  title: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  chevronRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
});
