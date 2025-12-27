import { ProductType } from '../../entities/Product/ProductType';
import { UserType } from '../../entities/Product/UserType';

export interface DiscountRepository {
  setUserDiscount(userType: UserType, discount: number): void;
  getUserDiscount(userType: UserType): number;

  setProductDiscount(productType: ProductType, discount: number): void;
  getProductDiscount(productType: ProductType): number;

  setUserProductDiscount(userType: UserType, productType: ProductType, discount: number): void;
  getUserProductDiscount(userType: UserType, productType: ProductType): number;
}
