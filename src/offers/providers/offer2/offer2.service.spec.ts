import { Test, TestingModule } from '@nestjs/testing';
import { Offer2Service } from './offer2.service';

describe('Offer2Service', () => {
  let service: Offer2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Offer2Service],
    }).compile();

    service = module.get<Offer2Service>(Offer2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should make the offers', async () => {
    const offers = await service.get();

    expect(offers[0]).toBeDefined();
  });
});
