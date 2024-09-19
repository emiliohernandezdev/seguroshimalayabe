import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AddProductRequest } from "./dto/request/add-product.request";

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    @Get()
    public async getProducts(){
        return await this.productService.getProducts();
    }

    @Post('add')
    public async addProduct(@Body() body: AddProductRequest){
        return await this.productService.addProduct(body);
    }
}