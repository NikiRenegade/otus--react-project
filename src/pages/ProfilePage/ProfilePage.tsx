import React, { useContext } from 'react';
import { ProfileForm } from '../../features/forms/ProfileForm/ProfileForm';
import { ChangePasswordForm } from '../../features/forms/ChangePasswordForm/ChangePasswordForm';
import styles from './ProfilePage.module.scss';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useGetProfileQuery } from '../../store/api';
import { AddCategoryForm } from 'src/features/forms/ChangeCategoryForm/AddCategoryForm';
import { useCreateCategoryMutation, useChangePasswordMutation } from '../../store/api';
import { useTranslation } from 'react-i18next';
import { notification } from 'antd';
import { normalizeApiError } from '../../utils/normalizeApiError';

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
      console.error(err);
      const { name, message } = normalizeApiError(err);
      switch (name) {
        case 'ValidationError':
          notification.error({ title: t('validation_error'), description: message });
          break;
        case 'InternalServerError':
          notification.error({ title: t('internal_server_error'), description: message });
          break;
        default:
          notification.error({ title: message });
      }
    }
  };
  const handleChangePasswordSubmit = async (data: { password: string; newPassword: string }) => {
    try {
      await changePassword(data).unwrap();
    } catch (err) {
      console.error(err);
      const { name, message } = normalizeApiError(err);
      switch (name) {
        case 'IncorrectPasswordError':
          notification.error({ title: t('incorrect_old_password'), description: message });
          break;
        case 'InvalidPasswordError':
          notification.error({ title: t('incorrect_new_password'), description: message });
          break;
        case 'InternalServerError':
          notification.error({ title: t('internal_server_error'), description: message });
          break;
        default:
          notification.error({ title: message });
      }
    }
  };
  const handleProfileSubmit = (data: any) => {
    // TODO: type this handler properly (see TYPE_SUGGESTIONS.md)
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
