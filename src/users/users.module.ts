import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { USER_SERVICE } from 'src/config/service';
import { envs } from 'src/config/envs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.usersMicroserviceHost,
          port: envs.usersMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}