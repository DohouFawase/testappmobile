import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/context/TranslationContext';
import { Translation } from '@/types/type';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function HistoryScreen() {
  const { theme } = useTheme();
  const { getHistory, clearHistory, removeTranslation } = useTranslation();
  const history = getHistory();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Effacer l\'historique',
      'Êtes-vous sûr de vouloir supprimer tout l\'historique ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Effacer', style: 'destructive', onPress: clearHistory },
      ]
    );
  };

  const handleRemoveItem = (id: string, text: string) => {
    Alert.alert(
      'Supprimer',
      `Supprimer la traduction "${text}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => removeTranslation(id) },
      ]
    );
  };

  const renderHistoryItem = ({ item }: { item: Translation }) => (
    <View style={[
      styles.historyItem,
      { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }
    ]}>
      <View style={styles.historyHeader}>
        <View style={styles.historyInfo}>
          <Text style={[styles.historyText, { color: theme.colors.text }]}>
            "{item.text}"
          </Text>
          <Text style={[styles.historyLanguage, { color: theme.colors.textSecondary }]}>
            {item.language === 'fr' ? 'Français' : 'English'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleRemoveItem(item.id, item.text)}
        >
          <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
        </TouchableOpacity>
      </View>

      <View style={styles.historyResult}>
        <Text style={styles.historyEmoji}>{item.result.emoji}</Text>
        <Text style={[styles.historyDescription, { color: theme.colors.textSecondary }]}>
          {item.result.description}
        </Text>
      </View>

      <Text style={[styles.historyDate, { color: theme.colors.textSecondary }]}>
        {formatDate(item.timestamp)}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Historique
        </Text>
        {history.length > 0 && (
          <TouchableOpacity
            style={[styles.clearAllButton, { borderColor: theme.colors.error }]}
            onPress={handleClearHistory}
          >
            <Text style={[styles.clearAllText, { color: theme.colors.error }]}>
              Tout effacer
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Liste ou message vide */}
      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={64} color={theme.colors.textSecondary} />
          <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
            Aucune traduction
          </Text>
          <Text style={[styles.emptyDescription, { color: theme.colors.textSecondary }]}>
            Vos 5 dernières traductions apparaîtront ici
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 60, // Pour éviter la barre de statut
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    clearAllButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderWidth: 1,
      borderRadius: 8,
    },
    clearAllText: {
      fontSize: 14,
      fontWeight: '500',
    },
    
    // Styles pour la liste vide
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginTop: 16,
      marginBottom: 8,
    },
    emptyDescription: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 22,
    },
    
    // Styles pour la liste
    listContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    historyItem: {
      padding: 16,
      marginBottom: 12,
      borderRadius: 12,
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    historyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    historyInfo: {
      flex: 1,
      marginRight: 12,
    },
    historyText: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 4,
      lineHeight: 22,
    },
    historyLanguage: {
      fontSize: 14,
      fontWeight: '400',
    },
    deleteButton: {
      padding: 4,
    },
    
    // Styles pour le résultat
    historyResult: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
      borderRadius: 8,
    },
    historyEmoji: {
      fontSize: 24,
      marginRight: 12,
    },
    historyDescription: {
      fontSize: 15,
      flex: 1,
      lineHeight: 20,
    },
    
    // Style pour la date
    historyDate: {
      fontSize: 12,
      textAlign: 'right',
      fontWeight: '400',
    },
  });