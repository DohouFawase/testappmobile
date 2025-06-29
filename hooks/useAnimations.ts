import * as Haptics from 'expo-haptics';
import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useAnimations = () => {
  // Animations de base
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Animation d'entrée fluide
  const fadeInUp = (duration = 600, delay = 0) => {
    return Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);
  };

  // Animation de scale avec haptic
  const scaleWithHaptic = (scale = 1.05, hapticType = 'impactLight') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle[hapticType as keyof typeof Haptics.ImpactFeedbackStyle]);;
    
    return Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: scale,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]);
  };

  // Animation de rotation infinie
  const infiniteRotate = (duration = 2000) => {
    rotateAnim.setValue(0);
    return Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
  };

  // Animation de pulsation
  const pulse = (minScale = 0.95, maxScale = 1.05, duration = 1000) => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: maxScale,
          duration: duration / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: minScale,
          duration: duration / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
  };

  return {
    fadeAnim,
    scaleAnim,
    slideAnim,
    rotateAnim,
    fadeInUp,
    scaleWithHaptic,
    infiniteRotate,
    pulse,
    // Styles animés prêts à utiliser
    animatedStyles: {
      fadeInUp: {
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      },
      scale: {
        transform: [{ scale: scaleAnim }],
      },
      rotate: {
        transform: [{
          rotate: rotateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          }),
        }],
      },
    },
  };
};