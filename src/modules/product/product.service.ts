import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { AddProductRequest } from "./dto/request/add-product.request";
import { AddProductResponse } from "./dto/response/add-product.response";
import { GetProductsResponse } from "./dto/response/get-product.response";

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly productRepo: Repository<Product>){}

    public async getProducts() {
        var response = new GetProductsResponse();
        try{
            const find = await this.productRepo.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.provider', 'provider')
            .where('product.isAvailable = true')
            .getMany();
            
            response.products = find;
            response.success = true;
            response.message = 'Listado de productos';
            return response;
        }catch(err){
            response.success = false;
            response.message = 'Error al cargar productos';
            return response;
        }
    }

    public async addProduct(request: AddProductRequest) {
        var response = new AddProductResponse();
        try{
            const creation = this.productRepo.create(request);
            const save = await this.productRepo.save(creation);
            response.success = true;
            response.product = save;
            response.message = 'Creado correctamente';
            return response;
        }catch(err){
            response.success = false;
            response.message = 'Error al crear el producto';
            return response;
        }
    }
}