import type { Meta, StoryObj } from '@storybook/react';
import { OperationFull } from './OperationFull';
import { ThemeProvider } from '../../contexts/ThemeContext';
import React from 'react';

const meta: Meta<typeof OperationFull> = {
  title: 'Components/OperationFull',
  component: OperationFull,
  argTypes: {
    name: { control: 'text' },
    categoryName: { control: 'text' },
    desc: { control: 'text' },
    amount: { control: 'text' },
    createdAt: { control: 'text' },
    categoryColor: { control: 'text' },
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
type Story = StoryObj<typeof OperationFull>;

export const Default: Story = {
  args: {
    name: 'Покупка в магазине',
    categoryName: 'Продуктовый магазин',
    desc: 'Ненужная покупка в продуктовом магазине. D котором было куплено много всего',
    amount: 5000,
    createdAt: new Date(),
    categoryColor: 'gray',
  },
};
