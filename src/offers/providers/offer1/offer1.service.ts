import { Injectable, Logger } from '@nestjs/common';
import { validate } from 'class-validator';
import { Offer } from '../../offers.entity';
import {
  DeviceType,
  OfferProvider,
  OfferProviderName,
  PlatformType,
} from '../../../offers/offers.interface';
import { payload } from './offer1.payload';

type Offer1Payload = (typeof payload.response.offers)[number];

@Injectable()
export class Offer1Service implements OfferProvider {
  private logger = new Logger(Offer1Service.name);

  async get() {
    // This is just a mock, but this should be the actual request
    const response = await Promise.resolve(payload);

    // Needs to be validated that it contains all of the correct data
    // Perhaps using something along the lines of
    // https://www.npmjs.com/package/ajv

    return this.parseResponse(response.response.offers);
  }

  async parseResponse(offers_response: Offer1Payload[]) {
    const offers_promises = offers_response
      .map(async (offer_payload) => {
        const offer = new Offer();

        offer.name = offer_payload.offer_name;
        offer.slug = offer_payload.offer_id;
        offer.description = offer_payload.offer_desc;
        offer.requirements = offer_payload.call_to_action;
        offer.thumbnail = offer_payload.image_url;
        offer.isDesktop =
          offer_payload.platform === PlatformType.Desktop ? 1 : 0;
        offer.isIos = offer_payload.device === DeviceType.IphoneIpad ? 1 : 0;
        offer.isAndroid =
          offer_payload.platform !== PlatformType.Desktop &&
          offer_payload.device !== DeviceType.IphoneIpad
            ? 1
            : 0;
        offer.offerUrlTemplate = offer_payload.offer_url;
        offer.providerName = OfferProviderName.Offer1;
        offer.externalOfferId = offer_payload.offer_id;

        const validated_offer = await validate(offer);

        if (validated_offer.length > 0) {
          this.logger.error(`Error parsing payload for ${offer_payload}`);
          return null;
        }

        return offer;
      })
      .filter((o) => o !== null);

    return await Promise.all(offers_promises);
  }
}
