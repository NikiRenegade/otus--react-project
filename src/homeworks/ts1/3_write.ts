/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

import {
  CategoriesForRandomGenerate,
  OperationCategoriesForRandomGenerate,
  ProductForRandomGenerate,
  ProductsForRandomGenerate
} from './helper/ProductRandomList';
import { Operation } from './types/Operation';
import { Product } from './types/Product';
import { OperationShortModel } from '../../entities/OperationShortModel';
import { OperationCategory } from '../../homeworks/ts1/types/OperationCategory';

// Создает случайный продукт (Product).
// Принимает дату создания (строка)
export const createRandomProduct = (createdAt: string): Product => {
  const productNameWithCategory: ProductForRandomGenerate =
    ProductsForRandomGenerate[Math.floor(Math.random() * ProductsForRandomGenerate.length)];
  const randomId = Math.random().toString(36).substring(2, 9);
  const randomPrice = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;

  return {
    id: randomId,
    name: productNameWithCategory.name,
    photo: `путь до фото ${randomId}`,
    desc: Math.random() < 0.5 ? 'Описание товара' : undefined,
    createdAt: createdAt,
    oldPrice: Math.random() < 0.5 ? randomPrice / 1.2 : undefined,
    price: randomPrice,
    category: productNameWithCategory.category,
  };
};

// Создает случайную операцию (Operation).
// Принимает дату создания (строка)
export const createRandomOperation = (createdAt: string): Operation => {
  const randomOperationCategory =
    CategoriesForRandomGenerate[Math.floor(Math.random() * CategoriesForRandomGenerate.length)];
  const randomId = Math.random().toString(36).substring(2, 9);
  const randomAmount = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
  const isCost = Math.random() < 0.5;

  return isCost
    ? {
        id: randomId,
        name: `Трата на категорию: ${randomOperationCategory.name}`,
        desc: Math.random() < 0.5 ? 'Описание траты' : undefined,
        createdAt: createdAt,
        amount: randomAmount,
        category: randomOperationCategory,
        type: 'Cost',
      }
    : {
        id: randomId,
        name: `Доход от категории: ${randomOperationCategory.name}`,
        desc: Math.random() < 0.5 ? 'Описание дохода' : undefined,
        createdAt: createdAt,
        amount: randomAmount,
        category: randomOperationCategory,
        type: 'Profit',
      };
};

export const createRandomOperationShort = (): OperationShortModel => {
  const randomAmount = Math.floor(Math.random() * (250000 - -250000 + 1)) + -250000;

  const isCost = randomAmount < 0;
  const categories = isCost
    ? OperationCategoriesForRandomGenerate.filter((c) => c.type === 'cost')
    : OperationCategoriesForRandomGenerate.filter((c) => c.type === 'profit');
  const randomOperationCategory: OperationCategory = categories[Math.floor(Math.random() * categories.length)];
  return isCost
    ? {
        id: 'randomId',
        title: `Трата на : ${randomOperationCategory.name}`,
        description: Math.random() < 0.5 ? 'Описание траты' : undefined,
        amount: randomAmount,
        category: randomOperationCategory.name,
      }
    : {
        id: 'randomId',
        title: `Доход от : ${randomOperationCategory.name}`,
        description: Math.random() < 0.5 ? 'Описание дохода' : undefined,
        amount: randomAmount,
        category: randomOperationCategory.name,
      };
};
