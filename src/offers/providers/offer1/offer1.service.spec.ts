import { Test, TestingModule } from '@nestjs/testing';
import { Offer1Service } from './offer1.service';

describe('Offer1Service', () => {
  let service: Offer1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Offer1Service],
    }).compile();

    service = module.get<Offer1Service>(Offer1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should make the offers', async () => {
    const offers = await service.get();

    expect(offers[0]).toBeDefined();
  });
});
