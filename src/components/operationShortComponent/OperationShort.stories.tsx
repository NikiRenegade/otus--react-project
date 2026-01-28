import type { Meta, StoryObj } from '@storybook/react';

import { OperationShort } from './OperationShort';
import { ThemeProvider } from '../../contexts/ThemeContext';
import React from 'react';
import { categories } from 'src/entities/Category';

const meta: Meta<typeof OperationShort> = {
  title: 'Components/OperationShort',
  component: OperationShort,
  argTypes: {
    operation: { control: 'object' },
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
type Story = StoryObj<typeof OperationShort>;

export const Positive: Story = {
  args: {
    operation: {
      id: 'Positive',
      title: 'Получение заработной платы',
      categoryId: '1a2b3c4d-0000-0000-0000-000000000005',
      description: 'Оплата за первую половину месяца',
      amount: 150000,
      category: categories.find((c) => c.id === '1a2b3c4d-0000-0000-0000-000000000005'),
    },
  },
};
export const Negative: Story = {
  args: {
    operation: {
      id: 'Negative',
      title: 'Покупка в магазине',
      categoryId: '1a2b3c4d-0000-0000-0000-000000000001',
      description: 'Ненужная покупка в продуктовом магазине.',
      amount: -5000,
      category: categories.find((c) => c.id === '1a2b3c4d-0000-0000-0000-000000000001'),
    },
  },
};
