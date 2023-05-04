import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { OfferProviderName } from './offers/offers.interface';
import { OffersService } from './offers/offers.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly offers: OffersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/offers')
  async getOffers() {
    const offers = await this.offers.fetchAll();
    return offers;
  }

  @Get('/offers/:provider')
  async getOffersByProvider(@Param('provider') provider: OfferProviderName) {
    const offers = await this.offers.fetchOffers(provider);
    return offers;
  }
}
