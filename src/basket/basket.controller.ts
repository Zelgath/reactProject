import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ApiMessage } from 'src/models/api-messages.model';
import { BasketService } from './basket.service';
import { BasketEntryDto } from './dtos/basket-entry.dto';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Get('/')
  getBasketEntries(): BasketEntryDto[] {
    return this.basketService.getBasketEntries();
  }

  @Post('/')
  addEntryToBasket(@Body() newEntry: BasketEntryDto): ApiMessage {
    return this.basketService.addEntryToBasket(newEntry);
  }

  @Delete('/:index')
  deleteEntryFromBasket(@Param('index') index: string): ApiMessage {
    return this.basketService.deleteEntryFromBasket(Number(index));
  }

  @Get('/total-price')
  getBasketTotalPrice(): {totalPrice: number} {
      return this.basketService.getBasketTotalPrice();
  }
}
