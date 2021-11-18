import { Inject, Injectable } from '@nestjs/common';
import { ApiMessage } from 'src/models/api-messages.model';
import { ShopService } from 'src/shop/shop.service';
import { BasketEntryDto } from './dtos/basket-entry.dto';

@Injectable()
export class BasketService {
  private userBasket: BasketEntryDto[] = [];

  constructor(@Inject(ShopService) private shopService: ShopService) {}

  addEntryToBasket(entry: BasketEntryDto): ApiMessage {
    if (
      typeof entry.name === 'string' &&
      typeof entry.count === 'number' &&
      entry.name.length > 0 &&
      entry.count >= 1 &&
      this.shopService.isProductAvailable(entry.name)
    ) {
      this.userBasket.push(entry);
      return {
        isSuccess: true,
        index: this.userBasket.findIndex(
          (el) => entry.name === el.name && entry.count === el.count,
        ),
      };
    } else {
      return { isSuccess: false };
    }
  }

  deleteEntryFromBasket(index: number): ApiMessage {
    if (index < this.userBasket.length) {
      this.userBasket.splice(index, 1);
      return { isSuccess: true };
    } else {
      return { isSuccess: false };
    }
  }

  getBasketEntries(): BasketEntryDto[] {
    return this.userBasket;
  }

  getBasketTotalPrice(): { totalPrice: number } {
    return {
      totalPrice: this.userBasket.reduce((prev, curr) => {
        return (
          prev + this.shopService.getProductGrossPrice(curr.name) * curr.count
        );
      }, 0),
    };
  }
}
