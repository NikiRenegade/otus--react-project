import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { ThemeProvider } from '../../contexts/ThemeContext';
import React from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal (SCSS)',
  component: Modal,
  argTypes: {
    visible: { control: 'boolean' },
    children: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    visible: true,
    children: 'Контент модального окна',
  },
};
