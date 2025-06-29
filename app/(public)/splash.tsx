import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animation d'entrée
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-navigation après 2.5s
    const timer = setTimeout(() => {
      router.replace('/(public)/onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, slideAnim, router]);

  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.secondary]}
      style={{ flex: 1 }}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
      }}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            alignItems: 'center',
          }}
        >
          <View style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 32,
          }}>
            <Ionicons name="language" size={60} color="white" />
          </View>
          
          <Animated.View
            style={{
              transform: [{ translateY: slideAnim }],
              alignItems: 'center',
            }}
          >
            <Text style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: 8,
            }}>
              SignTalk
            </Text>
            
            <Text style={{
              fontSize: 16,
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: 'center',
            }}>
              Traduction gestuelle intelligente
            </Text>
          </Animated.View>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}