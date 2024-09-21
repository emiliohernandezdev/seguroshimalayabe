import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AddProductRequest } from "./dto/request/add-product.request";

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    @Get()
    public async getProducts(){
        return await this.productService.getProducts();
    }

    @Get(':uuid')
    public async getProduct(@Param('uuid') uuid: string){
        return await this.productService.getProduct(uuid);
    }

    @Post('add')
    public async addProduct(@Body() body: AddProductRequest){
        return await this.productService.addProduct(body);
    }
    
}