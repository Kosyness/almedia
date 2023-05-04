import { CreateOfferDTO } from './create-offer.dto';

export interface IOffer {
  id: number;
  name: string;
  slug: string;
  description: string;
  requirements: string;
  thumbnail: string;
  isDesktop: number;
  isAndroid: number;
  isIos: number;
  offerUrlTemplate: string;
  providerName: OfferProviderName | null;
  externalOfferId: string | null;
}

export enum OfferProviderName {
  Offer1 = 'offer1',
  Offer2 = 'offer2',
}

export interface OfferProvider {
  get(): Promise<CreateOfferDTO[]>;

  parseResponse(payload: any): Promise<CreateOfferDTO[]>;
}

export enum PlatformType {
  Desktop = 'desktop',
  Mobile = 'mobile',
}

export enum DeviceType {
  IphoneIpad = 'iphone_ipad',
}
