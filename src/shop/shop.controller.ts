import { Controller, Get, Inject } from '@nestjs/common';
import { Product } from 'src/models/product.model';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  getAvailableProducts(): Product[] {
    return this.shopService.getAvailableProducts();
  }
}
