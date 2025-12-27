import type { Meta, StoryObj } from '@storybook/react';
import { ProfileForm } from './ProfileForm';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import React from 'react';

const meta: Meta<typeof ProfileForm> = {
  title: 'Form/ProfileForm',
  component: ProfileForm,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileForm>;

export const Default: Story = {};