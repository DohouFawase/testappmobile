// hooks/useTranslationHistory.ts
import { Translation } from '@/types/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const HISTORY_KEY = '@translation_history';
const MAX_HISTORY_ITEMS = 5;



export const useTranslationHistory = () =>{
    const [history, setHistory] = useState<Translation[]>([]);
    const [loading, setLoading] = useState(true);

      // Charger l'historique au démarrage
  useEffect(() => {
    loadHistory();
  }, []);


  const loadHistory = async (): Promise<void> => {
    try {
      const storedHistory = await AsyncStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        const parsedHistory: Translation[] = JSON.parse(storedHistory);
        // Convertir les timestamps string en Date
        const historyWithDates = parsedHistory.map(item => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistory(historyWithDates);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'historique:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveToHistory = async (translation: Translation): Promise<void> => {
    try {
      const updatedHistory = [translation, ...history];
      // Garder seulement les 5 dernières traductions
      const limitedHistory = updatedHistory.slice(0, MAX_HISTORY_ITEMS);
      
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
      setHistory(limitedHistory);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const clearHistory = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(HISTORY_KEY);
      setHistory([]);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'historique:', error);
    }
  };

  return {
    history,
    loading,
    saveToHistory,
    clearHistory,
    loadHistory
  };
};

