# Coding Challenge

The Idea behind the logic of this project is that: 

There is a central Offers Service Provider that handles the retrieval of offers from all the other providers. And then using an `enum` `OfferProviderName`, we can specify which provider we want to retrieve the offers from. This allows us to easy add new providers in the future, since only an enum will be needed to be added, and a new service that implements the `OfferService` interface.

## Requirements

- The project uses pnpm, thus `pnpm install` is required to install the dependencies. And to run the project, `pnpm start` is required.

## Important Files
- `src/offers/offers.service.ts` The General Offers Service that handles the retrieval of services from all the providers.
- `src/offers/providers/offer1/offer1.service.ts` The Service that handles the retrieval of services from the first provider.
- `src/offers/providers/offer2/offer2.service.ts` The Service that handles the retrieval of services from the second provider.

## Notes

### `create-offer.dto.ts`

The `providerName` and `externalOfferId` are required. Although in the Database, it can be `null`, when inserting a new Offer it is required. We will have no way of processing the Offer if the provider is not specified. 

Undefined behaviour will occur if the `providerName` or `externalOfferId` are not specified. 

## Changes from Original Challenge

### `offer.entity.ts`

Changed the `providerName` from being a `String` to an `Enum`. That way, typos are impossible to make. It makes undefined states unrepresentable.

### Recommended Changes

- Changing the `isAndroid` and the alike from `number` to `boolean` OR most preferably to an `Enum`. The `enum` could be something along the lines of
```ts
enum Platform { 
    Android = 'Android',
    iOS = 'iOS',
    Web = 'Web',
}

// or to make querying even faster in the database
enum Platform { 
    Android = 1,
    iOS = 2,
    Web = 3,
}
```

- Validation of Responses for `Offer2Service@get` and `Offer1Service@get`, using something along the lines of [AJV](https://ajv.js.org/)