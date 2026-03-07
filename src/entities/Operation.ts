import { Category } from '..//entities/Category';

type Cost = {
  id: string;
  name: string;
  desc?: string;
  createdAt?: Date;
  updatedAt?: Date;
  amount: number;
  category?: Category;
  commandId?: string;
  type?: 'Cost';
};

type Profit = {
  id: string;
  name: string;
  desc?: string;
  createdAt?: Date;
  updatedAt?: Date;
  amount: number;
  category?: Category;
  commandId?: string;
  type: 'Profit';
};

export type Operation = Profit | Cost;

export const operations: Operation[] = [];
