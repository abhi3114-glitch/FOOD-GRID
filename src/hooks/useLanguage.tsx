import { useContext } from 'react';
import { useLanguage as useLanguageContext } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';

export const useLanguage = () => {
  const { language, setLanguage } = useLanguageContext();

  const t = (key: string): string => {
    return getTranslation(language, key);
  };

  return { language, setLanguage, t };
};