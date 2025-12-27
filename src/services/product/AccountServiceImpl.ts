import { DiscountRepository } from './DiscountRepository';
import { AccountService } from 'src/services/product/AccountService';
import { UserType } from '../../entities/Product/UserType';
import { ProductType } from '../../entities/Product/ProductType';

export class AccountServiceImpl implements AccountService {
  private readonly _discountRepository: DiscountRepository;
  constructor(discountRepository: DiscountRepository) {
    this._discountRepository = discountRepository;
  }

  setUserDiscount(userType: UserType, discount: number): void {
    this._discountRepository.setUserDiscount(userType, discount);
  }
  setUserProductDiscount(userType: UserType, productType: ProductType, discount: number): void {
    this._discountRepository.setUserProductDiscount(userType, productType, discount);
  }
  setProductDiscount(userType: ProductType, discount: number): void {
    this._discountRepository.setProductDiscount(userType, discount);
  }
  getTotalProductDiscount(userType: UserType, productType: ProductType): number {
    const userProductDiscount = this._discountRepository.getUserProductDiscount(userType, productType);
    if (!userProductDiscount) {
      const userDiscount = this._discountRepository.getUserDiscount(userType) | 0;
      const productDiscount = this._discountRepository.getProductDiscount(productType) | 0;
      return userDiscount + productDiscount;
    }
    return userProductDiscount;
  }
}
