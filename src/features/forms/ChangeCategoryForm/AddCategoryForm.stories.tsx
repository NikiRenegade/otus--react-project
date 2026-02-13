import type { Meta, StoryObj } from '@storybook/react';
import { AddCategoryForm } from './AddCategoryForm';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import { LanguageProvider } from '../../../contexts/LanguageContext';
import React from 'react';

const meta: Meta<typeof AddCategoryForm> = {
  title: 'Form/AddCategoryForm',
  component: AddCategoryForm,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <LanguageProvider>
          <Story />
        </LanguageProvider>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AddCategoryForm>;

export const Default: Story = {};
