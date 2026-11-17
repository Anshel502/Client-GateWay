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
} from '@nestjs/common';import { CreateCouponDto } from './dto/create-coupon.dto';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';

import { UpdateCouponDto } from './dto/update-coupon.dto';
import { COUPON_SERVICE } from 'src/config/service';
import { ClientProxy, RpcException } from '@nestjs/microservices';


@Controller('coupons')
export class CouponsController {
  constructor(
    @Inject(COUPON_SERVICE) private readonly couponsClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsClient.send({ cmd: 'createCoupon' }, createCouponDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.couponsClient.send({ cmd: 'findAllCoupons' }, paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.couponsClient.send({ cmd: 'findOneCoupon' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    return this.couponsClient
      .send({ cmd: 'updateCoupon' }, { id, ...updateCouponDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.couponsClient.send({ cmd: 'removeCoupon' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}