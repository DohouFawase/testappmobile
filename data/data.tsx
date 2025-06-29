 import { TranslationResult } from '@/types/type';
 
export const MOCK_TRANSLATIONS: Record<string, TranslationResult> = {
  // Français
  'bonjour': { emoji: '👋', description: 'Geste de salutation', gestures: ['Lever la main', 'Mouvement de gauche à droite'] },
  'merci': { emoji: '🙏', description: 'Geste de remerciement', gestures: ['Joindre les mains', 'Incliner légèrement'] },
  'au revoir': { emoji: '👋', description: 'Geste d\'adieu', gestures: ['Lever la main', 'Mouvement d\'adieu'] },
  'oui': { emoji: '👍', description: 'Acquiescement', gestures: ['Hocher la tête vers le bas'] },
  'non': { emoji: '👎', description: 'Négation', gestures: ['Secouer la tête de gauche à droite'] },
  'je t\'aime': { emoji: '❤️', description: 'Expression d\'amour', gestures: ['Main sur le cœur', 'Pointer vers la personne'] },
  'eau': { emoji: '💧', description: 'Demande d\'eau', gestures: ['Mime de boire', 'Geste de verser'] },
  'manger': { emoji: '🍽️', description: 'Action de manger', gestures: ['Main vers la bouche', 'Mouvement de mastication'] },
  'dormir': { emoji: '😴', description: 'Action de dormir', gestures: ['Mains jointes sous la joue', 'Fermer les yeux'] },
  'aide': { emoji: '🆘', description: 'Demande d\'aide', gestures: ['Mains tendues', 'Expression inquiète'] },
  
  // English
  'hello': { emoji: '👋', description: 'Greeting gesture', gestures: ['Raise hand', 'Wave left to right'] },
  'thank you': { emoji: '🙏', description: 'Thank you gesture', gestures: ['Join hands', 'Slight bow'] },
  'goodbye': { emoji: '👋', description: 'Farewell gesture', gestures: ['Raise hand', 'Waving motion'] },
  'yes': { emoji: '👍', description: 'Affirmation', gestures: ['Nod head down'] },
  'no': { emoji: '👎', description: 'Negation', gestures: ['Shake head left to right'] },
  'i love you': { emoji: '❤️', description: 'Love expression', gestures: ['Hand on heart', 'Point to person'] },
  'water': { emoji: '💧', description: 'Water request', gestures: ['Drinking mime', 'Pouring gesture'] },
  'eat': { emoji: '🍽️', description: 'Eating action', gestures: ['Hand to mouth', 'Chewing motion'] },
  'sleep': { emoji: '😴', description: 'Sleep action', gestures: ['Hands under cheek', 'Close eyes'] },
  'help': { emoji: '🆘', description: 'Help request', gestures: ['Extended hands', 'Worried expression'] },
};
