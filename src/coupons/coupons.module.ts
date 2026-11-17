import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { COUPON_SERVICE } from 'src/config/service';
import { envs } from 'src/config/envs';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: COUPON_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.couponsMicroserviceHost,
          port: envs.couponsMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [CouponsController],
})
export class CouponsModule {}
