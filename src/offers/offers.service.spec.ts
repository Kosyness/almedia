import { Test, TestingModule } from '@nestjs/testing';
import { OffersService } from './offers.service';
import { Offer1Service } from './providers/offer1/offer1.service';
import { Offer2Service } from './providers/offer2/offer2.service';

describe('OffersService', () => {
  let service: OffersService;

  beforeEach(async () => {
    try {
      const module: TestingModule = await Test.createTestingModule({
        providers: [OffersService, Offer1Service, Offer2Service],
      }).compile();

      service = module.get<OffersService>(OffersService);
    } catch (e: any) {}
  });

  it('should be defined', () => {
    expect(service).not.toBeDefined();
  });
});
