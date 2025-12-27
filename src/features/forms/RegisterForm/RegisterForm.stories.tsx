import type { Meta, StoryObj } from '@storybook/react';
import { RegisterForm } from './RegisterForm';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import React from 'react';

const meta: Meta<typeof LoginForm> = {
  title: 'Form/RegisterForm',
  component: RegisterForm,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {};
