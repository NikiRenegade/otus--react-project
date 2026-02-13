import React, { useContext } from 'react';
import { ProfileForm } from '../../features/forms/ProfileForm/ProfileForm';
import { ChangePasswordForm } from '../../features/forms/ChangePasswordForm/ChangePasswordForm';
import styles from './ProfilePage.module.scss';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useGetProfileQuery } from '../../store/api';
import { AddCategoryForm } from 'src/features/forms/ChangeCategoryForm/AddCategoryForm';
import { useCreateCategoryMutation, useChangePasswordMutation } from '../../store/api';
import { useTranslation } from 'react-i18next';

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const profile = useGetProfileQuery().data;
  const [createCategory] = useCreateCategoryMutation();
  const [changePassword] = useChangePasswordMutation();
  const handleCategorySubmit = async (data: { name: string }) => {
    try {
      await createCategory(data.name).unwrap();
    } catch (err) {
      switch (err?.data?.errors[0]?.name) {
        case 'ValidationError':
          alert(`${t('validation_error')}`);
          break;
        case 'InternalServerError':
          alert(`${t('internal_server_error')}`);
          break;
        default:
          alert(err?.data?.errors[0]?.message);
      }
    }
  };
  const handleChangePasswordSubmit = async (data: { password: string; newPassword: string }) => {
    try {
      await changePassword(data).unwrap();
    } catch (err) {
      switch (err?.data?.errors[0]?.name) {
        case 'IncorrectPasswordError':
          alert(`${t('incorrect_old_password')}`);
          break;
        case 'InvalidPasswordError':
          alert(`${t('incorrect_new_password')}`);
          break;
        case 'InternalServerError':
          alert(`${t('internal_server_error')}`);
          break;
        default:
          alert(err?.data?.errors[0]?.message);
      }
    }
  };
  const handleProfileSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className={`${styles.profile} ${styles[theme]}`}>
      <ProfileForm
        profileValues={{
          name: profile?.name,
          email: profile?.email,
          phone: profile?.phone,
          description: profile?.description,
        }}
        onSubmit={handleProfileSubmit}
      />

      <ChangePasswordForm onSubmit={handleChangePasswordSubmit} />
      <AddCategoryForm onSubmit={handleCategorySubmit} />
    </div>
  );
};
