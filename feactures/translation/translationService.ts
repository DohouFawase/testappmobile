import { gestureMap } from "@/data/data";
import { Language } from '@/types/type';


export const translateToGesture = (text: string, language: Language): string => {
    const normalizedText = text.toLowerCase().trim();
    
    // Chercher une correspondance exacte
    if (gestureMap[normalizedText]) {
      return gestureMap[normalizedText];
    }
    
    // Chercher dans les mots individuels
    const words = normalizedText.split(' ');
    const gestures = words.map(word => gestureMap[word] || '❓').join(' ');
    
    // Si aucune correspondance, retourner un geste par défaut
    return gestures.includes('❓') ? '🤟' : gestures;
  };