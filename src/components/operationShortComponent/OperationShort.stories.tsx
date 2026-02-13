import type { Meta, StoryObj } from '@storybook/react';

import { OperationShort } from './OperationShort';
import { ThemeProvider } from '../../contexts/ThemeContext';
import React from 'react';

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
      name: 'Получение заработной платы',
      desc: 'Оплата за первую половину месяца',
      amount: 150000,
    },
  },
};
export const Negative: Story = {
  args: {
    operation: {
      id: 'Negative',
      name: 'Покупка в магазине',
      desc: 'Ненужная покупка в продуктовом магазине.',
      amount: -5000,
    },
  },
};
