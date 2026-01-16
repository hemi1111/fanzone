import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {
  Between,
  ILike,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(
    offset: number = 0,
    search?: string,
    categories?: string[],
    productTypes?: string[],
    minPrice?: number,
    maxPrice?: number,
    discountedOnly?: boolean,
    sortOption?: string,
  ) {
    const where: any = {};
    const limit = 40;

    if (search) {
      where.name = ILike(`%${search}%`);
    }

    if (categories && categories.length > 0) {
      if (categories.length === 1 && categories[0].includes(',')) {
        categories = categories[0].split(',').map((c) => c.trim());
      }

      where.category = In(categories);
    }

    if (productTypes && productTypes.length > 0) {
      if (productTypes.length === 1 && productTypes[0].includes(',')) {
        productTypes = productTypes[0].split(',').map((pt) => pt.trim());
      }

      where.product_type = In(productTypes);
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      where.price = Between(minPrice, maxPrice);
    } else if (minPrice !== undefined) {
      where.price = MoreThanOrEqual(minPrice);
    } else if (maxPrice !== undefined) {
      where.price = LessThanOrEqual(maxPrice);
    }

    if (discountedOnly) {
      where.discount = true;
    }

    // Handle sorting
    let order = {};
    switch (sortOption) {
      case 'price-low':
        order = { price: 'ASC' };
        break;
      case 'price-high':
        order = { price: 'DESC' };
        break;
      case 'name-asc':
        order = { name: 'ASC' };
        break;
      case 'name-desc':
        order = { name: 'DESC' };
        break;
      default:
        order = { category: 'ASC' };
    }

    const [products, total] = await Promise.all([
      this.productsRepository.find({
        where,
        skip: offset,
        take: limit,
        order,
      }),
      this.productsRepository.count({ where }),
    ]);

    return {
      products,
      hasNextPage: total > offset + limit,
      total,
    };
  }

  findOne(id: string) {
    return this.productsRepository.findOne({ where: { id } });
  }

  searchProducts(search: string) {
    return this.productsRepository.find({
      where: { name: ILike(`%${search}%`) },
    });
  }

  getRelatedProducts(category: string, id: string) {
    return this.productsRepository.find({
      where: {
        category,
        id: Not(id),
      },
    });
  }

  addProduct(product: CreateProductDto) {
    return this.productsRepository.save(product);
  }

  async deleteProduct(productId: string) {
    const result = await this.productsRepository.update(
      { id: productId },
      { is_active: false },
    );
    if (result.affected === 0) {
      throw new Error('Product not found');
    }
    return result;
  }

  async updateProduct(productId: string, updateData: UpdateProductDto) {
    const result = await this.productsRepository.update(
      { id: productId },
      updateData,
    );
    if (result.affected === 0) {
      throw new Error('Product not found');
    }
    return result;
  }
}
