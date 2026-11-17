import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { CouponsModule } from './coupons/coupons.module';
import { ClientsModule } from './clients/clients.module';


@Module({
  imports: [ProductsModule, OrdersModule,UsersModule, CouponsModule, ClientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
