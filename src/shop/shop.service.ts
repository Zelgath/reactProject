import { Injectable } from '@nestjs/common';
import { Product } from 'src/models/product.model';

@Injectable()
export class ShopService {
  private availableProducts: Product[] = [
    { name: 'Szynka', description: 'Wieprzowa', netPrice: 8 },
    { name: 'Kaszanka', description: 'Z wątróbką', netPrice: 4 },
    { name: 'Boczek', description: 'Wędzony', netPrice: 6 },
  ];

  private availableProductsNames: string[] = this.availableProducts.map((el) =>
    el.name.toLowerCase(),
  );

  getAvailableProducts(): Product[] {
    return this.availableProducts;
  }

  isProductAvailable(productName: string): boolean {
    return this.availableProductsNames.includes(productName.toLowerCase());
  }

  getProductGrossPrice(productName: string): number {
    return (
      this.availableProducts.find(
        (el) => productName.toLowerCase() === el.name.toLowerCase(),
      ).netPrice * 1.23
    );
  }
}
