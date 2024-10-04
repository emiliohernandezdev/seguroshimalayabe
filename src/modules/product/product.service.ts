import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { AddProductRequest } from './dto/request/add-product.request';
import { AddProductResponse } from './dto/response/add-product.response';
import { GetProductsResponse } from './dto/response/get-product.response';
import { GetProductResponse } from './dto/response/product-response';
import { BaseResponse } from 'src/utilities/BaseResponse.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  public async getMinMaxPrice() {
    var response = new BaseResponse();
    try {
      const find = await this.productRepo
        .createQueryBuilder('product')
        .select('MIN(product.price)', 'min')
        .addSelect('MAX(product.price)', 'max')
        .getRawOne();

        response.success = true;
        response.message = 'Precios obtenidos';
        response.data = find;
        return response;
    } catch (err) {
        console.log(err)
      response.success = false;
      response.message = 'Error al cargar el rango de precios';
      return response;
    }
  }

  public async getProducts() {
    var response = new GetProductsResponse();
    try {
      const find = await this.productRepo
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.provider', 'provider')
        .where('product.isAvailable = true')
        .getMany();

      response.products = find;
      response.success = true;
      response.message = 'Listado de productos';
      return response;
    } catch (err) {
      response.success = false;
      response.message = 'Error al cargar productos';
      return response;
    }
  }

  public async addProduct(request: AddProductRequest) {
    var response = new AddProductResponse();
    try {
      const creation = this.productRepo.create(request);
      const save = await this.productRepo.save(creation);
      response.success = true;
      response.product = save;
      response.message = 'Creado correctamente';
      return response;
    } catch (err) {
      response.success = false;
      response.message = 'Error al crear el producto';
      return response;
    }
  }

  public async getProduct(uuid: string) {
    var response = new GetProductResponse();
    try {
      const find = await this.productRepo
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.provider', 'provider')
        .where('product.uuid = :uuid', { uuid: uuid })
        .getOne();

      if (find) {
        response.product = find;
        response.success = true;
        response.message = 'Producto obtenido';
        return response;
      } else {
        response.success = false;
        response.message = 'No se encontro el producto';
        return response;
      }
    } catch (err) {
      response.success = false;
      response.message = 'Error al cargar el producto';
      return response;
    }
  }
}
