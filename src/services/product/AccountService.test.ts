import { DiscountRepository } from './DiscountRepository';
import { AccountServiceImpl } from './AccountServiceImpl';
import { UserType } from 'src/entities/Product/UserType';
import { ProductType } from 'src/entities/Product/ProductType';
import { InMemoryDiscountRepository } from './InMemoryDiscountRepository';

describe('Тестирование AccountService с использованием mock', () => {
  let service: AccountServiceImpl;
  let repository: jest.Mocked<DiscountRepository>;
  beforeEach(() => {
    repository = {
      setUserDiscount: jest.fn(),
      getUserDiscount: jest.fn(),
      setUserProductDiscount: jest.fn(),
      getUserProductDiscount: jest.fn(),
      setProductDiscount: jest.fn(),
      getProductDiscount: jest.fn(),
    };
    service = new AccountServiceImpl(repository);
  });
  test('Тест расчета суммарной скидки когда для конкретного пользователя своя скидка', () => {
    repository.getUserProductDiscount.mockReturnValue(25);

    const result = service.getTotalProductDiscount(UserType.Gold, ProductType.Car);
    expect(result).toBe(25);
  });
  test('Тест расчета суммарной скидки когда указан UserType и ProductType', () => {
    repository.getUserProductDiscount.mockReturnValue(null);
    repository.getProductDiscount.mockReturnValue(10);
    repository.getUserDiscount.mockReturnValue(14);

    const result = service.getTotalProductDiscount(UserType.Gold, ProductType.Car);
    expect(result).toBe(24);
  });
  test('Тест расчета суммарной скидки когда указан только UserType', () => {
    repository.getUserProductDiscount.mockReturnValue(null);
    repository.getProductDiscount.mockReturnValue(null);
    repository.getUserDiscount.mockReturnValue(10);

    const result = service.getTotalProductDiscount(UserType.Gold, ProductType.Car);
    expect(result).toBe(10);
  });
  test('Тест расчета суммарной скидки когда указан только ProductType', () => {
    repository.getUserProductDiscount.mockReturnValue(null);
    repository.getProductDiscount.mockReturnValue(15);
    repository.getUserDiscount.mockReturnValue(null);

    const result = service.getTotalProductDiscount(UserType.Gold, ProductType.Car);
    expect(result).toBe(15);
  });
  test('Тест суммарной скидки когда скидки нет', () => {
    repository.getUserProductDiscount.mockReturnValue(null);
    repository.getProductDiscount.mockReturnValue(null);
    repository.getUserDiscount.mockReturnValue(null);

    const result = service.getTotalProductDiscount(UserType.Gold, ProductType.Car);
    expect(result).toBe(0);
  });
});

describe('Тестирование AccountService с использованием inMemoryRepository', () => {
  let service: AccountServiceImpl;
  let repository: InMemoryDiscountRepository;
  beforeEach(() => {
    repository = new InMemoryDiscountRepository();
    service = new AccountServiceImpl(repository);
  });
  test('Тест расчета суммарной скидки когда для конкретного пользователя своя скидка', () => {
    service.setUserProductDiscount(UserType.Gold, ProductType.Car, 50);
    service.setUserDiscount(UserType.Gold, 15);
    service.setProductDiscount(ProductType.Car, 20);
    const result = service.getTotalProductDiscount(UserType.Gold, ProductType.Car);
    expect(result).toBe(50);
  });
  test('Тест расчета суммарной скидки когда указан UserType и ProductType', () => {
    service.setUserDiscount(UserType.Gold, 15);
    service.setProductDiscount(ProductType.Car, 20);

    const result = service.getTotalProductDiscount(UserType.Gold, ProductType.Car);
    expect(result).toBe(35);
  });
  test('Тест расчета суммарной скидки когда указан только UserType', () => {
    service.setUserDiscount(UserType.Gold, 15);

    const result = service.getTotalProductDiscount(UserType.Gold, ProductType.Car);
    expect(result).toBe(15);
  });
  test('Тест расчета суммарной скидки когда указан только ProductType', () => {
    service.setProductDiscount(ProductType.Car, 20);

    const result = service.getTotalProductDiscount(UserType.Gold, ProductType.Car);
    expect(result).toBe(20);
  });
  test('Тест суммарной скидки когда скидки нет', () => {
    const result = service.getTotalProductDiscount(UserType.Gold, ProductType.Car);
    expect(result).toBe(0);
  });
});
