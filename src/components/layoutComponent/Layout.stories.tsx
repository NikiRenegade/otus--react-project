import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Layout } from './Layout';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { MemoryRouter } from 'react-router-dom';
const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h1>Заголовок контента страницы</h1>
        <p>Контента внутри</p>
      </div>
    ),
  },
};
