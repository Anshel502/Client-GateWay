import { IsBoolean, IsInt, IsOptional, IsString, Max, Min, MinLength } from "class-validator";

export class CreateClientDto {
     @IsString()
    @MinLength(3)
    public code!:string;

    @IsInt()
    @Min(1)
    @Max(100)
    public discount!:number;

    @IsOptional()
    @IsBoolean()
    public isActive!:boolean;
}
