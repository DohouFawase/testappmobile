import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { theme, colorScheme, toggleColorScheme } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnecter', style: 'destructive', onPress: logout },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Header utilisateur */}
        <View style={[
          styles.userHeader,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }
        ]}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.colors.text }]}>
              {user?.name || 'Utilisateur'}
            </Text>
            <Text style={[styles.userEmail, { color: theme.colors.textSecondary }]}>
              {user?.email || 'email@example.com'}
            </Text>
          </View>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.optionItem,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }
            ]}
            onPress={toggleColorScheme}
          >
            <View style={styles.optionLeft}>
              <Ionicons
                name={colorScheme === 'dark' ? 'sunny' : 'moon'}
                size={24}
                color={theme.colors.primary}
              />
              <Text style={[styles.optionText, { color: theme.colors.text }]}>
                Mode {colorScheme === 'dark' ? 'clair' : 'sombre'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionItem,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }
            ]}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="language" size={24} color={theme.colors.primary} />
              <Text style={[styles.optionText, { color: theme.colors.text }]}>
                Langue
              </Text>
            </View>
            <View style={styles.optionRight}>
              <Text style={[styles.optionValue, { color: theme.colors.textSecondary }]}>
                Français
              </Text>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionItem,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }
            ]}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="help-circle" size={24} color={theme.colors.primary} />
              <Text style={[styles.optionText, { color: theme.colors.text }]}>
                Aide et support
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Bouton de déconnexion */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  languageSelector: {
    marginBottom: 24,
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  languageButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  languageButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  inputSection: {
    marginBottom: 24,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  characterCount: {
    textAlign: 'right',
    fontSize: 12,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  translateButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  translateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  resultContent: {
    alignItems: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  gesturesContainer: {
    marginTop: 16,
  },
  gesturesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  gestureItem: {
    fontSize: 14,
    marginBottom: 4,
  },
  clearAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  clearAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  emptyDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
  historyItem: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  historyInfo: {
    flex: 1,
  },
  historyText: {
    fontSize: 16,
    fontWeight: '600',
  },
  historyLanguage: {
    fontSize: 12,
    marginTop: 2,
  },
  deleteButton: {
    padding: 4,
  },
  historyResult: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  historyDescription: {
    fontSize: 14,
    flex: 1,
  },
  historyDate: {
    fontSize: 12,
    textAlign: 'right',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    marginTop: 4,
  },
  optionsContainer: {
    marginBottom: 32,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionValue: {
    fontSize: 14,
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

