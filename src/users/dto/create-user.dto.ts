import { Type } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  public name!: string;

  @IsEmail()
  public email!: string;
}