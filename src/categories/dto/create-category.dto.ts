import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  public name!: string;

  @IsOptional()
  @IsString()
  public description?: string;
}