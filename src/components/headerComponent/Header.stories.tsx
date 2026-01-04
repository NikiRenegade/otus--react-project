import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import React from 'react';
import { AuthProvider } from '../../contexts/AuthContext';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              <Story />
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};
