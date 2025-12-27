import { ProductType } from '../../entities/Product/ProductType';
import { UserType } from '../../entities/Product/UserType';

export interface AccountService {
  setUserDiscount(userType: UserType, discount: number): void;
  setUserProductDiscount(userType: UserType, productType: ProductType, discount: number): void;
  setProductDiscount(userType: ProductType, discount: number): void;
  getTotalProductDiscount(userType: UserType, productType: ProductType): number;
}
