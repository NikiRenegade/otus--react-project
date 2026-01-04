import type { Meta, StoryObj } from '@storybook/react';
import { ChangePasswordForm } from './ChangePasswordForm';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import { LanguageProvider } from '../../../contexts/LanguageContext';
import React from 'react';

const meta: Meta<typeof ChangePasswordForm> = {
  title: 'Form/ChangePasswordForm',
  component: ChangePasswordForm,
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
type Story = StoryObj<typeof ChangePasswordForm>;

export const Default: Story = {};
