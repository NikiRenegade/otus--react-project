import { Category } from '..//entities/Category';

export interface Operation {
  id: string;
  title: string;
  description?: string;
  createdAt?: string;
  amount: number;
  categoryId: string;
  category?: Category;
}

export const operations: Operation[] = [
  {
    id: 'b6a1e7f2-0f4b-4b8e-9a1c-1a3f2e5d4c01',
    title: 'Доход от : Заработная плата',
    description: 'Описание дохода',
    amount: 178032,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000005',
    createdAt: '2025-10-05',
  },
  {
    id: 'd2f3a1b4-1c9e-4e21-8a7d-2c0b9e3a5f02',
    title: 'Трата на : Кафе',
    amount: -99788,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000004',
    createdAt: '2025-11-02',
  },
  {
    id: 'a3c5e6d7-2b4a-4f91-9c3d-3b7e2a6f5d03',
    title: 'Трата на : Кафе',
    description: 'Описание траты',
    amount: -25259,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000004',
    createdAt: '2025-12-10',
  },
  {
    id: 'c4b2a1e9-3d5f-46b8-8e2a-4f6a9d7c1e04',
    title: 'Доход от : Премия',
    amount: 238805,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000006',
    createdAt: '2025-12-25',
  },
  {
    id: 'e5d3c2b1-4f6a-4a8d-9e1c-5a7f2c6b3d05',
    title: 'Доход от : Заработная плата',
    description: 'Описание дохода',
    amount: 75816,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000005',
    createdAt: '2025-12-25',
  },
  {
    id: 'f6e4d3c2-5a7b-4c9e-8d2f-6b1a5c4e7f06',
    title: 'Доход от : Выполнение заказа',
    amount: 238828,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000007',
    createdAt: '2025-12-27',
  },
  {
    id: 'a7f5e4d3-6b8c-4e1a-9d3c-7e2b6f5a4c07',
    title: 'Доход от : Премия',
    description: 'Описание дохода',
    amount: 78458,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000006',
    createdAt: '2025-12-27',
  },
  {
    id: 'b8a6f5e4-7c9d-4f2b-8e4a-8c3f7d6e5b08',
    title: 'Доход от : Перевод',
    description: 'Описание дохода',
    amount: 125810,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000008',
    createdAt: '2025-12-29',
  },
  {
    id: 'c9b7a6f5-8d1e-4a3c-9f5b-9d4e8c7f6a09',
    title: 'Доход от : Заработная плата',
    amount: 209405,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000005',
    createdAt: '2025-12-29',
  },
  {
    id: 'd0c8b7a6-9e2f-4c4d-8a6c-0e5f9d8c7b10',
    title: 'Трата на : Аренда',
    description: 'Описание траты',
    amount: -59414,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000002',
    createdAt: '2025-12-29',
  },
  {
    id: 'e1d9c8b7-0f3a-4d5e-9b7d-1f6a0e9d8c11',
    title: 'Трата на : Одежда',
    amount: -226665,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000003',
    createdAt: '2025-12-30',
  },
  {
    id: 'f2e0d9c8-1a4b-4e6f-8c8e-2a7b1f0e9d12',
    title: 'Трата на : Магазин',
    amount: -104420,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000001',
    createdAt: '2025-12-31',
  },
  {
    id: 'a3f1e0d9-2b5c-4f7a-9d9f-3b8c2a1f0e13',
    title: 'Трата на : Одежда',
    amount: -82503,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000003',
    createdAt: '2025-12-31',
  },
  {
    id: 'b4a2f1e0-3c6d-4a8b-8e0a-4c9d3b2a1f14',
    title: 'Доход от : Премия',
    amount: 100388,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000006',
    createdAt: '2025-12-31',
  },
  {
    id: 'c5b3a2f1-4d7e-4b9c-9f1b-5d0e4c3b2a15',
    title: 'Доход от : Премия',
    description: 'Описание дохода',
    amount: 155048,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000006',
    createdAt: '2025-12-31',
  },
  {
    id: 'd6c4b3a2-5e8f-4c0d-8a2c-6e1f5d4c3b16',
    title: 'Трата на : Магазин',
    description: 'Описание траты',
    amount: -179301,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000001',
    createdAt: '2025-12-31',
  },
  {
    id: 'e7d5c4b3-6f9a-4d1e-9b3d-7f2a6e5d4c17',
    title: 'Доход от : Выполнение заказа',
    description: 'Описание дохода',
    amount: 222676,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000007',
    createdAt: '2025-12-31',
  },
  {
    id: 'f8e6d5c4-7a0b-4e2f-8c4e-8a3b7f6e5d18',
    title: 'Трата на : Кафе',
    amount: -157221,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000004',
    createdAt: '2025-12-31',
  },
  {
    id: 'a9f7e6d5-8b1c-4f3a-9d5f-9b4c8a7f6e19',
    title: 'Доход от : Выполнение заказа',
    amount: 106053,
    categoryId: '1a2b3c4d-0000-0000-0000-000000000007',
    createdAt: '2025-12-31',
  },
];
