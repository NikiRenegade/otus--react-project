import type { Meta, StoryObj } from '@storybook/react';
import { OperationListOld } from './OperationListOld';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { createRandomOperationShort } from '../../homeworks/ts1/3_write';
import React from 'react';

const meta: Meta<typeof OperationListOld> = {
  title: 'Components/OperationListOld',
  component: OperationListOld,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};
const operationsArray = [...Array(50)].map(() => createRandomOperationShort());
export default meta;
type Story = StoryObj<typeof OperationListOld>;

export const Default: Story = {
  args: {
    operations: operationsArray,
  },
};
