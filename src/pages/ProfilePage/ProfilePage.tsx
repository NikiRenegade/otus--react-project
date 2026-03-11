import React, { useContext } from 'react';
import { Category } from '../../entities/Category';
import { CategoryList} from '../../components/CategoryListComponent/CategoryList';
import { ProfileForm } from '../../features/forms/ProfileForm/ProfileForm';
import { ChangePasswordForm } from '../../features/forms/ChangePasswordForm/ChangePasswordForm';
import styles from './ProfilePage.module.scss';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AddCategoryForm } from 'src/features/forms/ChangeCategoryForm/AddCategoryForm';
import {
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useGetProfileQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation,
} from '../../store/api';
import { useTranslation } from 'react-i18next';
import { notification } from 'antd';
import { normalizeApiError } from '../../utils/normalizeApiError';
export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const profile = useGetProfileQuery().data;
  const categories = useGetCategoriesQuery().data?.data;
  console.log(categories);
  const [createCategory] = useCreateCategoryMutation();
  const [changePassword] = useChangePasswordMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const handleCreateCategory = async (data: { name: string }) => {
    try {
      await createCategory(data).unwrap();
      notification.success({ title: t('category_added') });
    } catch (err) {
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
  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      notification.success({ title: t('category_deleted') });
    } catch (err) {
      const { message } = normalizeApiError(err);
      notification.error({ title: message });
    }
  };
  const handleUpdateCategory = async (category: Category) => {
    const newName = prompt(t('edit_category'), category.name);

    try {
      await updateCategory({
        id: category.id,
        name: newName,
      }).unwrap();

      notification.success({ title: t('category_updated') });
    } catch (err) {
      const { message } = normalizeApiError(err);
      notification.error({ title: message });
    }
  };
  const handleChangePasswordSubmit = async (data: { password: string; newPassword: string }) => {
    try {
      await changePassword(data).unwrap();
      notification.success({ title: t('password_updated') });
    } catch (err) {
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
  const handleProfileSubmit = async (data: { name?: string; email: string }) => {
    try {
      await updateProfile({
        name: data.name || '',
        email: data.email,
      }).unwrap();

      notification.success({ title: t('profile_updated') });
    } catch (err) {
      console.error(err);
      const { name, message } = normalizeApiError(err);

      switch (name) {
        case 'ValidationError':
          notification.error({
            title: t('validation_error'),
            description: message,
          });
          break;

        case 'InternalServerError':
          notification.error({
            title: t('internal_server_error'),
            description: message,
          });
          break;

        default:
          notification.error({
            title: message,
          });
      }
    }
  };

  return (
    <div className={`${styles.profile} ${styles[theme]}`}>
      <ProfileForm
        profileValues={{
          name: profile?.name,
          email: profile?.email,
        }}
        onSubmit={handleProfileSubmit}
      />

      <ChangePasswordForm onSubmit={handleChangePasswordSubmit} />
      <AddCategoryForm onSubmit={handleCreateCategory} />
      {categories && (
        <CategoryList categories={categories} onEdit={handleUpdateCategory} onDelete={handleDeleteCategory} />
      )}
    </div>
  );
};
