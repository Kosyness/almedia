import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfferDTO } from './create-offer.dto';
import { Offer } from './offers.entity';
import { OfferProvider, OfferProviderName } from './offers.interface';
import { Offer1Service } from './providers/offer1/offer1.service';
import { Offer2Service } from './providers/offer2/offer2.service';

@Injectable()
export class OffersService {
  services: Map<OfferProviderName, OfferProvider> = new Map([
    [OfferProviderName.Offer1, this.offer1Service as OfferProvider],
    [OfferProviderName.Offer2, this.offer2Service as OfferProvider],
  ]);

  constructor(
    private offer1Service: Offer1Service,
    private offer2Service: Offer2Service,
    @InjectRepository(Offer)
    private offersRep: Repository<Offer>,
  ) {}

  providers() {
    return Array.from(this.services.values());
  }

  async storeOffers(offers: CreateOfferDTO[]) {
    return this.offersRep.save(offers);
  }

  async fetchOffers(provider: OfferProviderName) {
    return await this.services.get(provider).get();
  }

  async fetchAndStoreOffers(provider: OfferProviderName) {
    return this.fetchOffers(provider).then(this.storeOffers);
  }

  async getProvider(provider: OfferProviderName) {
    return this.services.get(provider);
  }

  async fetchAll() {
    return (await Promise.all(this.providers().map((p) => p.get()))).flat();
  }

  async fetchAllAndStore() {
    return this.fetchAll().then(this.storeOffers);
  }
}
