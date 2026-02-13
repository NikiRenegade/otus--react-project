import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { LanguageProvider } from 'src/contexts/LanguageContext';
import AppLayout from 'src/layouts/AppLayout';
import { ProfilePage } from 'src/pages/ProfilePage/ProfilePage';
import { OperationPage } from 'src/pages/OperationPage/OperationPage';
import { NotFoundPage } from 'src/pages/NotFoundPage/NotFoundPage';
import { HomePage } from 'src/pages/HomePage/HomePage';
import { Header } from 'src/components/headerComponent/Header';
import { ModalManager } from 'src/components/modalManager/ModalManager';
import { AppDispatch, State } from '../store/index';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { setInitialized } from 'src/store/slices/appSlice';

function App() {
  const isAuth = useSelector((state: State) => state.auth.authenticated);
  const location = useLocation();
  const locationState = location.state as { background?: Location };
  const background = locationState?.background;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setInitialized());
  }, [dispatch]);

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
          {isAuth && <Route path="/operations/new/edit" element={<ModalManager />} />}
        </Routes>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
