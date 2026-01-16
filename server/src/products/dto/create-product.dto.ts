import { IsString, IsNumber, IsBoolean, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  final_price: number;

  @IsString()
  thumbnail: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsBoolean()
  discount: boolean;

  @IsBoolean()
  is_active: boolean;
}
