import React, { useContext } from 'react';
import './App.css';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { LanguageProvider } from 'src/contexts/LanguageContext';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthContext } from 'src/contexts/AuthContext';
import AppLayout from 'src/layouts/AppLayout';
import { ProfilePage } from 'src/pages/ProfilePage/ProfilePage';
import { OperationPage } from 'src/pages/OperationPage/OperationPage';
import { NotFoundPage } from 'src/pages/NotFoundPage/NotFoundPage';
import { HomePage } from 'src/pages/HomePage/HomePage';
import { Header } from 'src/components/headerComponent/Header';
import { ModalManager } from 'src/components/modalNavigate/ModalManager';

function App() {
  const { user } = useContext(AuthContext);
  const isAuth = Boolean(user);
  const location = useLocation();

  const state = location.state as { background?: Location };
  const background = state?.background;

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Header />

        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />

          {isAuth && (
            <Route element={<AppLayout />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/operations" element={<OperationPage />} />
            </Route>
          )}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Routes>
          <Route path="/login" element={<ModalManager />} />
          <Route path="/register" element={<ModalManager />} />
          {isAuth && <Route path="/operations/:id/:mode" element={<ModalManager />} />}
        </Routes>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
