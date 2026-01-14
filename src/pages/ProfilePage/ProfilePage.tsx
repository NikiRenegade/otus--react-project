import React, { useContext, useState } from 'react';
import { ProfileForm } from '../../features/forms/ProfileForm/ProfileForm';
import { ChangePasswordForm } from '../../features/forms/ChangePasswordForm/ChangePasswordForm';
import { User } from '../../entities/User';
import styles from './ProfilePage.module.scss';
import { ThemeContext } from '../../contexts/ThemeContext';
import { State } from '../..//store/index';
import { useSelector } from 'react-redux';

export const ProfilePage: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [profile, setProfile] = useState<User>(useSelector((state: State) => state.auth.user));

  const handleProfileSubmit = (data: any) => {
    setProfile((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handlePasswordSubmit = (data: { currentPassword: string; newPassword: string }) => {
    if (data.currentPassword !== profile.password) {
      //todo error
      return;
    }

    setProfile((prev) => ({
      ...prev,
      password: data.newPassword,
    }));
  };

  return (
    <div className={`${styles.profile} ${styles[theme]}`}>
      <ProfileForm
        profileValues={{
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          description: profile.description,
        }}
        onSubmit={handleProfileSubmit}
      />

      <ChangePasswordForm onSubmit={handlePasswordSubmit} />
    </div>
  );
};
