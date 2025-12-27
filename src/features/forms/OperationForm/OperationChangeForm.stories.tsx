import type { Meta, StoryObj } from '@storybook/react';
import { OperationChangeForm } from './OperationChangeForm';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import React from 'react';

const meta: Meta<typeof OperationChangeForm> = {
  title: 'Form/OperationChangeForm',
  component: OperationChangeForm,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OperationChangeForm>;

export const Default: Story = {};