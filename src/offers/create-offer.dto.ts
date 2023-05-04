import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { OfferProviderName } from './offers.interface';

export class CreateOfferDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  requirements: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsInt()
  isDesktop: number;

  @IsInt()
  isAndroid: number;

  @IsInt()
  isIos: number;

  @IsString()
  @IsNotEmpty()
  offerUrlTemplate: string;

  @IsEnum(OfferProviderName)
  providerName: OfferProviderName;

  @IsString()
  @IsNotEmpty()
  externalOfferId: string;
}
