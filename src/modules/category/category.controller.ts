import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { AddCategoryRequest } from "./dto/request/add-category.request";

@Controller('category')
export class CategoryController{
    constructor(private readonly categoryService: CategoryService){}

    @Get()
    public async getCategories(){
        return await this.categoryService.getCategories()
    }

    @Post('add')
    public async addCategory(@Body() body: AddCategoryRequest){
        return await this.categoryService.addCategory(body)
    }
}