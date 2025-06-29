import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradient: string[];
}

const slides: OnboardingSlide[] = [
  {
    title: 'Traduisez facilement',
    description: 'Convertissez votre texte en langue des signes avec des gestes visuels clairs',
    icon: 'language-outline',
    gradient: ['#667eea', '#764ba2'],
  },
  {
    title: 'Gardez un historique',
    description: 'Retrouvez vos 5 dernières traductions à tout moment',
    icon: 'time-outline',
    gradient: ['#f093fb', '#f5576c'],
  },
];

export default function OnboardingScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: width * nextIndex,
        animated: true,
      });
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      router.replace('/(public)/login');
    });
  };

  const handleScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / width);
    setCurrentIndex(index);
  };

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 16,
        }}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={{
              color: theme.colors.textSecondary,
              fontSize: 16,
            }}>
              Passer
            </Text>
          </TouchableOpacity>
          
          <View style={{ flexDirection: 'row' }}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginHorizontal: 4,
                  backgroundColor: index === currentIndex 
                    ? theme.colors.primary 
                    : theme.colors.border,
                }}
              />
            ))}
          </View>
          
          <View style={{ width: 50 }} />
        </View>

        {/* Slides */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
        >
          {slides.map((slide, index) => (
            <View
              key={index}
              style={{
                width,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 40,
              }}
            >
              <LinearGradient
                colors={slide.gradient}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 60,
                }}
              >
                <Ionicons name={slide.icon} size={80} color="white" />
              </LinearGradient>

              <Text style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: theme.colors.text,
                textAlign: 'center',
                marginBottom: 16,
              }}>
                {slide.title}
              </Text>

              <Text style={{
                fontSize: 16,
                color: theme.colors.textSecondary,
                textAlign: 'center',
                lineHeight: 24,
              }}>
                {slide.description}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Footer */}
        <View style={{
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}>
          <TouchableOpacity
            onPress={handleNext}
            style={{
              backgroundColor: theme.colors.primary,
              paddingVertical: 16,
              borderRadius: theme.borderRadius.md,
              alignItems: 'center',
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '600',
            }}>
              {currentIndex === slides.length - 1 ? 'Commencer' : 'Suivant'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}