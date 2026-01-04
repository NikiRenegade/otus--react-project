import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'src/contexts/ThemeContext';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.home} ${styles[theme]}`}>
      <h1>{t('home_title')}</h1>
      <p>{t('home_subtitle')}</p>
    </div>
  );
};
