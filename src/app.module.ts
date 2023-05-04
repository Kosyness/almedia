import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OffersService } from './offers/offers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer1Service } from './offers/providers/offer1/offer1.service';
import { Offer2Service } from './offers/providers/offer2/offer2.service';
import { Offer } from './offers/offers.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Offer]),
  ],
  controllers: [AppController],
  providers: [AppService, OffersService, Offer1Service, Offer2Service],
})
export class AppModule {}
