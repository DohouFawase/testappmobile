import { useTheme } from '@/context/ThemeContext';
import { Stack } from 'expo-router';

export default function TranslateLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Traduction Gestuelle',
          headerLargeTitle: true,
        }}
      />
    
    </Stack>
  );
}