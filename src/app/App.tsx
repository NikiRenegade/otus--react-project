import React, { useContext } from 'react';
import './App.css';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { LanguageProvider } from 'src/contexts/LanguageContext';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from 'src/contexts/AuthContext';
import AppLayout from 'src/layouts/AppLayout';
import { ProfilePage } from 'src/pages/ProfilePage/ProfilePage';
import { OperationPage } from 'src/pages/OperationPage/OperationPage';
import { NotFoundPage } from 'src/pages/NotFoundPage/NotFoundPage';
import { HomePage } from 'src/pages/HomePage/HomePage';
import { Header } from 'src/components/headerComponent/Header';

function App() {
  const { user } = useContext(AuthContext);
  const isAuth = Boolean(user);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />

          {isAuth && (
            <Route element={<AppLayout />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/operations" element={<OperationPage />} />
            </Route>
          )}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
