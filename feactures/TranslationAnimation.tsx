import { useTheme } from '@/context/ThemeContext';
import { TranslationResult } from '@/types/type';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

interface TranslationAnimationProps {
  result: TranslationResult;
  isVisible: boolean;
}

export const TranslationAnimation: React.FC<TranslationAnimationProps> = ({
  result,
  isVisible,
}) => {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const particleAnims = useRef(
    Array.from({ length: 8 }, () => ({
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    if (isVisible) {
      startAnimation();
    } else {
      resetAnimation();
    }
  }, [isVisible]);

  const startAnimation = () => {
    // Animation principale de l'emoji
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation des particules
    const particleAnimations = particleAnims.map((anim, index) => {
      const angle = (index * 45) * (Math.PI / 180);
      const distance = 80;
      
      return Animated.sequence([
        Animated.delay(200 + index * 50),
        Animated.parallel([
          Animated.timing(anim.opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateX, {
            toValue: Math.cos(angle) * distance,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateY, {
            toValue: Math.sin(angle) * distance,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(anim.opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.parallel(particleAnimations).start();
  };

  const resetAnimation = () => {
    scaleAnim.setValue(0);
    rotateAnim.setValue(0);
    particleAnims.forEach(anim => {
      anim.translateX.setValue(0);
      anim.translateY.setValue(0);
      anim.opacity.setValue(0);
    });
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '10deg'],
  });

  return (
    <View style={styles.container}>
      {/* Particules d'animation */}
      {particleAnims.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              transform: [
                { translateX: anim.translateX },
                { translateY: anim.translateY },
              ],
              opacity: anim.opacity,
            },
          ]}
        >
          <Text style={styles.particleEmoji}>✨</Text>
        </Animated.View>
      ))}

      {/* Emoji principal animé */}
      <Animated.View
        style={[
          styles.emojiContainer,
          {
            transform: [
              { scale: scaleAnim },
              { rotate: rotateInterpolate },
            ],
          },
        ]}
      >
        <Text style={styles.emoji}>{result.emoji}</Text>
      </Animated.View>

      {/* Description avec animation de fade */}
      <Animated.Text
        style={[
          styles.description,
          { color: theme.colors.textSecondary, opacity: scaleAnim },
        ]}
      >
        {result.description}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: width - 40,
    position: 'relative',
  },
  particle: {
    position: 'absolute',
    zIndex: 1,
  },
  particleEmoji: {
    fontSize: 16,
  },
  emojiContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    zIndex: 2,
  },
  emoji: {
    fontSize: 60,
  },
  description: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});