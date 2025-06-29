import { useTheme } from '@/context/ThemeContext';
import * as Haptics from 'expo-haptics';
import React, { useRef } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler'; // ✅ correct

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  leftAction?: string;
  rightAction?: string;
  upAction?: string;
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  leftAction = '🗑️',
  rightAction = '❤️',
  upAction = '📤',
}) => {
  const { theme } = useTheme();
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    const { translationX, translationY, state } = event.nativeEvent;

    if (state === 5) { // END state
      const absX = Math.abs(translationX);
      const absY = Math.abs(translationY);

      // Déterminer la direction du swipe
      if (absY > absX && translationY < -SWIPE_THRESHOLD && onSwipeUp) {
        // Swipe up
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        animateOut('up');
        setTimeout(onSwipeUp, 200);
      } else if (absX > SWIPE_THRESHOLD) {
        if (translationX > 0 && onSwipeRight) {
          // Swipe right
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          animateOut('right');
          setTimeout(onSwipeRight, 200);
        } else if (translationX < 0 && onSwipeLeft) {
          // Swipe left
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          animateOut('left');
          setTimeout(onSwipeLeft, 200);
        } else {
          resetCard();
        }
      } else {
        resetCard();
      }
    }
  };

  const animateOut = (direction: 'left' | 'right' | 'up') => {
    const targetX = direction === 'left' ? -width : direction === 'right' ? width : 0;
    const targetY = direction === 'up' ? -400 : 0;

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: targetX,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: targetY,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetCard = () => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Animations dynamiques basées sur le mouvement
  const rotateZ = translateX.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-15deg', '0deg', '15deg'],
    extrapolate: 'clamp',
  });

  const leftActionOpacity = translateX.interpolate({
    inputRange: [-SWIPE_THRESHOLD, -50, 0],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const rightActionOpacity = translateX.interpolate({
    inputRange: [0, 50, SWIPE_THRESHOLD],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const upActionOpacity = translateY.interpolate({
    inputRange: [-SWIPE_THRESHOLD, -50, 0],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              { translateX },
              { translateY },
              { rotateZ },
              { scale },
            ],
            opacity,
          },
        ]}
      >
        {/* Actions indicateurs */}
        <Animated.View style={[styles.actionLeft, { opacity: leftActionOpacity }]}>
          <Text style={styles.actionText}>{leftAction}</Text>
        </Animated.View>
        
        <Animated.View style={[styles.actionRight, { opacity: rightActionOpacity }]}>
          <Text style={styles.actionText}>{rightAction}</Text>
        </Animated.View>
        
        <Animated.View style={[styles.actionUp, { opacity: upActionOpacity }]}>
          <Text style={styles.actionText}>{upAction}</Text>
        </Animated.View>

        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          {children}
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  card: {
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  actionLeft: {
    position: 'absolute',
    left: 20,
    top: '50%',
    zIndex: 1,
    transform: [{ translateY: -20 }],
  },
  actionRight: {
    position: 'absolute',
    right: 20,
    top: '50%',
    zIndex: 1,
    transform: [{ translateY: -20 }],
  },
  actionUp: {
    position: 'absolute',
    top: 20,
    left: '50%',
    zIndex: 1,
    transform: [{ translateX: -20 }],
  },
  actionText: {
    fontSize: 32,
  },
});