import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import React from 'react';

const meta: Meta<typeof LoginForm> = {
  title: 'Form/LoginForm',
  component: LoginForm,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};