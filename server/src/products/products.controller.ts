import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiKeyGuard } from 'src/auth/api-key/api-key.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query('offset') offset: string,
    @Query('search') search?: string,
    @Query('categories') categories?: string | string[],
    @Query('productTypes') productTypes?: string | string[],
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('discountedOnly') discountedOnly?: string,
    @Query('sortOption') sortOption?: string,
  ) {
    const parsedOffset = parseInt(offset) || 0;
    const parsedMinPrice =
      minPrice !== undefined ? parseFloat(minPrice) : undefined;
    const parsedMaxPrice =
      maxPrice !== undefined ? parseFloat(maxPrice) : undefined;
    const parsedDiscountedOnly = discountedOnly === 'true';

    // Handle both single and multiple category values
    const parsedCategories = categories
      ? Array.isArray(categories)
        ? categories
        : [categories]
      : undefined;

    // Handle both single and multiple product type values
    const parsedProductTypes = productTypes
      ? Array.isArray(productTypes)
        ? productTypes
        : [productTypes]
      : undefined;

    return this.productsService.findAll(
      parsedOffset,
      search,
      parsedCategories,
      parsedProductTypes,
      parsedMinPrice,
      parsedMaxPrice,
      parsedDiscountedOnly,
      sortOption,
    );
  }

  @Get('search')
  searchProducts(@Query('name') name: string) {
    return this.productsService.searchProducts(name);
  }

  @Get('related/:category/:id')
  getRelatedProducts(
    @Param('category') category: string,
    @Param('id') id: string,
  ) {
    return this.productsService.getRelatedProducts(category, id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(ApiKeyGuard)
  @Post()
  addProduct(@Body() product: CreateProductDto) {
    return this.productsService.addProduct(product);
  }

  @UseGuards(ApiKeyGuard)
  @Delete(':id')
  deleteProduct(@Param('id') productId: string) {
    return this.productsService.deleteProduct(productId);
  }

  @UseGuards(ApiKeyGuard)
  @Patch(':id')
  updateProduct(
    @Param('id') productId: string,
    @Body() updateData: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(productId, updateData);
  }
}
