import React, { useContext, useState } from 'react';
import { ProfileForm } from '../../features/forms/ProfileForm/ProfileForm';
import { ChangePasswordForm } from '../../features/forms/ChangePasswordForm/ChangePasswordForm';
import { users, User } from '../../entities/User';
import styles from './ProfilePage.module.scss';
import { ThemeContext } from '../../contexts/ThemeContext';

export const ProfilePage: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [user, setUser] = useState<User>(users[0]);

  const handleProfileSubmit = (data: any) => {
    setUser((prev) => ({
      ...prev,
      ...data,
    }));

    console.log('Профиль обновлен:', data);
  };

  const handlePasswordSubmit = (data: { currentPassword: string; newPassword: string }) => {
    if (data.currentPassword !== user.password) {
      //todo error
      return;
    }

    setUser((prev) => ({
      ...prev,
      password: data.newPassword,
    }));

    console.log('Пароль обновлен', data);
  };

  return (
    <div className={`${styles.profile} ${styles[theme]}`}>
      <ProfileForm
        profileValues={{
          name: user.name,
          email: user.email,
          phone: user.phone,
          description: user.description,
        }}
        onSubmit={handleProfileSubmit}
      />

      <ChangePasswordForm onSubmit={handlePasswordSubmit} />
    </div>
  );
};
