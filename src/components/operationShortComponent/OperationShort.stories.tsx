import type { Meta, StoryObj } from '@storybook/react';

import { OperationShort } from './OperationShort';
import { ThemeProvider } from '../../contexts/ThemeContext';
import React from 'react';
import { OperationShortModel } from 'src/entities/OperationShortModel';

const onView = (op: OperationShortModel) => {
  console.log('onView', op);
};

const onEdit = (op: OperationShortModel) => {
  console.log('onEdit', op);
};

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
      category: 'ЗП',
      description: 'Оплата за первую половину месяца',
      amount: 150000,
    },
  },
};
export const Negative: Story = {
  args: {
    operation: {
      id: 'Negative',
      title: 'Покупка в магазине',
      category: 'Продуктовый магазин',
      description: 'Ненужная покупка в продуктовом магазине.',
      amount: -5000,
    },
  },
};
