import { MOCK_TRANSLATIONS } from "@/data/data";
import { Translation, TranslationContextType } from '@/types/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
const TranslationContext = createContext<TranslationContextType | null>(null);

const STORAGE_KEY = '@translations';
const MAX_HISTORY = 5;

export function TranslationProvider({ children }: { children: React.ReactNode }) {
    const [translations, setTranslations] = useState<Translation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      loadTranslations();
    }, []);
  
    const loadTranslations = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsedTranslations = JSON.parse(saved);
          setTranslations(parsedTranslations);
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };
  
    const saveTranslations = async (newTranslations: Translation[]) => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTranslations));
        setTranslations(newTranslations);
      } catch (error) {
        console.error('Failed to save translations:', error);
      }
    };
  
    const translate = async (text: string, language: 'fr' | 'en'): Promise<Translation> => {
      setIsLoading(true);
      
      try {
        // Simulation d'un délai d'API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const normalizedText = text.toLowerCase().trim();
        const result = MOCK_TRANSLATIONS[normalizedText] || {
          emoji: '🤷‍♂️',
          description: 'Traduction non trouvée',
          gestures: ['Geste non disponible pour ce texte']
        };
  
        const translation: Translation = {
          id: `${Date.now()}_${Math.random()}`,
          text: text,
          language,
          result,
          timestamp: Date.now(),
        };
  
        // Ajouter à l'historique (garder seulement les 5 derniers)
        const updatedTranslations = [translation, ...translations].slice(0, MAX_HISTORY);
        await saveTranslations(updatedTranslations);
        
        return translation;
      } finally {
        setIsLoading(false);
      }
    };
  
    const getHistory = (): Translation[] => {
      return translations.sort((a, b) => b.timestamp - a.timestamp);
    };
  
    const clearHistory = async () => {
      try {
        await AsyncStorage.removeItem(STORAGE_KEY);
        setTranslations([]);
      } catch (error) {
        console.error('Failed to clear history:', error);
      }
    };
  
    const removeTranslation = async (id: string) => {
      try {
        const updatedTranslations = translations.filter(t => t.id !== id);
        await saveTranslations(updatedTranslations);
      } catch (error) {
        console.error('Failed to remove translation:', error);
      }
    };
  
    return (
      <TranslationContext.Provider
        value={{
          translations,
          isLoading,
          translate,
          getHistory,
          clearHistory,
          removeTranslation,
        }}
      >
        {children}
      </TranslationContext.Provider>
    );
  }
  
  export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
      throw new Error('useTranslation must be used within TranslationProvider');
    }
    return context;
  };
  