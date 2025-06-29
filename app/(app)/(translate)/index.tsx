import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/context/TranslationContext';
import { Translation } from '@/types/type';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function TranslateScreen() {
  const { theme } = useTheme();
  const { translate, isLoading } = useTranslation();
  const [text, setText] = useState('');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [result, setResult] = useState<Translation | null>(null);

  const handleTranslate = async () => {
    if (!text.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer du texte à traduire');
      return;
    }

    try {
      const translation = await translate(text.trim(), language);
      setResult(translation);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de traduire le texte');
      console.error('Translation error:', error);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Traduction Gestuelle
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Convertissez votre texte en langue des signes
          </Text>
        </View>

        {/* Sélecteur de langue */}
        <View style={styles.languageSelector}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Langue source:
          </Text>
          <View style={styles.languageButtons}>
            <TouchableOpacity
              style={[
                styles.languageButton,
                { backgroundColor: language === 'fr' ? theme.colors.primary : theme.colors.surface },
                { borderColor: theme.colors.border }
              ]}
              onPress={() => setLanguage('fr')}
            >
              <Text style={[
                styles.languageButtonText,
                { color: language === 'fr' ? '#FFFFFF' : theme.colors.text }
              ]}>
                Français
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.languageButton,
                { backgroundColor: language === 'en' ? theme.colors.primary : theme.colors.surface },
                { borderColor: theme.colors.border }
              ]}
              onPress={() => setLanguage('en')}
            >
              <Text style={[
                styles.languageButtonText,
                { color: language === 'en' ? '#FFFFFF' : theme.colors.text }
              ]}>
                English
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Zone de saisie */}
        <View style={styles.inputSection}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Texte à traduire:
          </Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                color: theme.colors.text
              }
            ]}
            value={text}
            onChangeText={setText}
            placeholder={language === 'fr' ? 'Tapez votre texte ici...' : 'Type your text here...'}
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            maxLength={200}
          />
          <Text style={[styles.characterCount, { color: theme.colors.textSecondary }]}>
            {text.length}/200
          </Text>
        </View>

        {/* Boutons d'action */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.clearButton,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }
            ]}
            onPress={handleClear}
            disabled={isLoading}
          >
            <Text style={[styles.clearButtonText, { color: theme.colors.textSecondary }]}>
              Effacer
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.translateButton,
              { backgroundColor: theme.colors.primary },
              isLoading && { opacity: 0.7 }
            ]}
            onPress={handleTranslate}
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.translateButtonText}>
                Traduire
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Résultat de la traduction */}
        {result && (
          <View style={[
            styles.resultContainer,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }
          ]}>
            <Text style={[styles.resultTitle, { color: theme.colors.text }]}>
              Traduction en LSF:
            </Text>
            
            <View style={styles.resultContent}>
              <Text style={styles.emoji}>{result.result.emoji}</Text>
              <Text style={[styles.description, { color: theme.colors.text }]}>
                {result.result.description}
              </Text>
            </View>

            {result.result.gestures && (
              <View style={styles.gesturesContainer}>
                <Text style={[styles.gesturesTitle, { color: theme.colors.text }]}>
                  Gestes à effectuer:
                </Text>
                {result.result.gestures.map((gesture, index) => (
                  <Text key={index} style={[styles.gestureItem, { color: theme.colors.textSecondary }]}>
                    • {gesture}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      padding: 20,
      paddingTop: 60, // Pour éviter la barre de statut
    },
    
    // Header
    header: {
      marginBottom: 32,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 22,
    },
    
    // Sélecteur de langue
    languageSelector: {
      marginBottom: 28,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 12,
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
      borderWidth: 1.5,
      alignItems: 'center',
    },
    languageButtonText: {
      fontSize: 16,
      fontWeight: '500',
    },
    
    // Zone de saisie
    inputSection: {
      marginBottom: 28,
    },
    textInput: {
      borderWidth: 1.5,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      minHeight: 120,
      textAlignVertical: 'top',
      lineHeight: 22,
    },
    characterCount: {
      textAlign: 'right',
      fontSize: 14,
      marginTop: 8,
    },
    
    // Boutons d'action
    actionButtons: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 32,
    },
    clearButton: {
      flex: 1,
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 12,
      borderWidth: 1.5,
      alignItems: 'center',
    },
    clearButtonText: {
      fontSize: 16,
      fontWeight: '500',
    },
    translateButton: {
      flex: 2,
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 50,
    },
    translateButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    
    // Résultat de la traduction
    resultContainer: {
      borderWidth: 1.5,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
    },
    resultTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
    },
    resultContent: {
      alignItems: 'center',
      marginBottom: 20,
    },
    emoji: {
      fontSize: 48,
      marginBottom: 12,
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 22,
      fontWeight: '500',
    },
    
    // Gestes
    gesturesContainer: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: 'rgba(0, 0, 0, 0.1)',
    },
    gesturesTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 12,
    },
    gestureItem: {
      fontSize: 15,
      lineHeight: 22,
      marginBottom: 6,
      paddingLeft: 8,
    },
  });