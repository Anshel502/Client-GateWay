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
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { CATEGORY_SERVICE } from 'src/config/service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject(CATEGORY_SERVICE) private readonly categoriesClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesClient
      .send({ cmd: 'createCategory' }, createCategoryDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.categoriesClient
      .send({ cmd: 'findAllCategories' }, paginationDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesClient
      .send({ cmd: 'findOneCategory' }, { id })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
 ) {
    return this.categoriesClient
      .send({ cmd: 'updateCategory' }, { id, ...updateCategoryDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesClient
      .send({ cmd: 'removeCategory' }, { id })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
