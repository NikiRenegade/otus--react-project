import { ProductType } from '../../entities/Product/ProductType';
import { UserType } from '../../entities/Product/UserType';
import { DiscountRepository } from './DiscountRepository';

export class InMemoryDiscountRepository implements DiscountRepository {
  private userDiscounts = new Map<UserType, number>();
  private productDiscounts = new Map<ProductType, number>();
  private userProductDiscounts = new Map<string, number>();

  setUserDiscount(userType: UserType, discount: number): void {
    this.userDiscounts.set(userType, discount);
  }
  getUserDiscount(userType: UserType): number {
    return this.userDiscounts.get(userType);
  }

  setProductDiscount(productType: ProductType, discount: number): void {
    this.productDiscounts.set(productType, discount);
  }
  getProductDiscount(productType: ProductType): number {
    return this.productDiscounts.get(productType);
  }

  setUserProductDiscount(userType: UserType, productType: ProductType, discount: number): void {
    this.userProductDiscounts.set(`${userType}__${productType}`, discount);
  }
  getUserProductDiscount(userType: UserType, productType: ProductType): number {
    return this.userProductDiscounts.get(`${userType}__${productType}`);
  }
}
