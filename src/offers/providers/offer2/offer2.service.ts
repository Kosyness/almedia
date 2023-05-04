import { Injectable, Logger } from '@nestjs/common';
import { validate } from 'class-validator';
import { Offer } from '../../../offers/offers.entity';
import { OfferProvider } from '../../../offers/offers.interface';
import { payload } from './offer2.payload';

type Offer2Payload = (typeof payload.data)[keyof typeof payload.data];

@Injectable()
export class Offer2Service implements OfferProvider {
  private logger = new Logger(Offer2Service.name);

  async get() {
    // This is just a mock, but this should be the actual request
    const response = await Promise.resolve(payload);

    // Needs to be validated that it contains all of the correct data
    // Perhaps using something along the lines of
    // https://www.npmjs.com/package/ajv

    const offers_response = Object.values(response.data);
    return this.parseResponse(offers_response);
  }

  async parseResponse(offers_response: Array<Offer2Payload>) {
    const offers_promises = offers_response
      .map(async (offer_payload) => {
        const offer = new Offer();

        offer.name = offer_payload.Offer.name;

        offer.thumbnail = offer_payload.Offer.icon;
        offer.offerUrlTemplate = offer_payload.Offer.tracking_url;
        offer.requirements = offer_payload.Offer.instructions;
        offer.description = offer_payload.Offer.description;
        offer.isDesktop = offer_payload.OS.web ? 1 : 0;
        offer.isAndroid = offer_payload.OS.android ? 1 : 0;
        offer.isIos = offer_payload.OS.ios ? 1 : 0;
        offer.externalOfferId = offer_payload.Offer.campaign_id.toString();

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
