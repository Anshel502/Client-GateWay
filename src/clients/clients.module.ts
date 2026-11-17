import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { CLIENT_SERVICE } from 'src/config/service';
import { envs } from 'src/config/envs';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: CLIENT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.clientsMicroserviceHost,
          port: envs.clientsMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [ClientsController],
})
export class ClientssModule {}
