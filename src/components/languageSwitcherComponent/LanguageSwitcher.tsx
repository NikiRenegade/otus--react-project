import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import styles from './languageSwitcher.module.scss';

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  return (
    <button className={styles['language-switcher']} onClick={toggleLanguage}>
      {language === 'ru' ? 'RU' : 'EN'}
    </button>
  );
}
