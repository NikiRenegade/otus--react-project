import React, { useContext } from 'react';
import styles from './header.module.scss';
import { Logo } from '../logoComponent/Logo';
import { ThemeSwitcher } from '../themeSwitcherComponent/ThemeSwitcher';
import { NavLink } from 'react-router-dom';
import { LanguageSwitcher } from '../languageSwitcherComponent/LanguageSwitcher';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../contexts/AuthContext';
import { AuthModal } from '../../components/authModalComponent/AuthModal';

export function Header() {
  const { theme } = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = React.useState<'login' | 'register' | null>(null);
  const isAuth = Boolean(auth?.user);

  return (
    <>
      <header className={`${styles.header} ${styles[theme]}`}>
        <div className={styles['header__logo']}>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>

        <nav className={styles['header__nav']}>
          {isAuth ? (
            <>
              <NavLink className={styles['header__nav__link']} to="/profile">
                {t('profile')}
              </NavLink>
              <NavLink className={styles['header__nav__link']} to="/operations">
                {t('my_operations')}
              </NavLink>
              <button className={styles['header__nav__button']} onClick={auth.logout}>
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <button
                className={styles['header__nav__button']}
                onClick={() => setModalOpen('login')}
              >
                {t('login')}
              </button>
              <button className={styles['header__nav__button']} onClick={() => setModalOpen('register')}>
                {t('register')}
              </button>
            </>
          )}
        </nav>

        <ThemeSwitcher />
        <LanguageSwitcher />
      </header>

      {modalOpen && <AuthModal mode={modalOpen} onClose={() => setModalOpen(null)} onSwitch={setModalOpen} />}
    </>
  );
}
