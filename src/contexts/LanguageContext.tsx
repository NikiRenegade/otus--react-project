import React, { createContext, useState } from 'react';
import i18n from '../i18n/i18n';
export type Language = 'ru' | 'en';

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: 'ru',
  toggleLanguage: () => {
    throw new Error('Not implemented!');
  },
});

type LanguageProviderProps = {
  children: React.ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = React.useState<Language>('ru');
  const toggleLanguage = () => {
    const newLanguage = language === 'ru' ? 'en' : 'ru';
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };
  return <LanguageContext.Provider value={{ language, toggleLanguage }}>{children}</LanguageContext.Provider>;
};
