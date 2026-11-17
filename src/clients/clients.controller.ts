import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';import { CreateClientDto } from './dto/create-client.dto';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';

import { UpdateClientDto } from './dto/update-client.dto';
import { CLIENT_SERVICE, COUPON_SERVICE } from 'src/config/service';
import { ClientProxy, RpcException } from '@nestjs/microservices';


@Controller('clients')
export class ClientsController {
  constructor(
    @Inject(CLIENT_SERVICE) private readonly clientsClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsClient.send({ cmd: 'create_customer' }, createClientDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clientsClient.send({ cmd: 'find_all_customers' }, paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientsClient.send({ cmd: 'find_one_customer' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsClient
      .send({ cmd: 'update_customer' }, { id, ...updateClientDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientsClient.send({ cmd: 'remove_customer' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}