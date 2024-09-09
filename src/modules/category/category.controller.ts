import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { AddCategoryRequest } from "./dto/request/add-category.request";
import { UpdateCategoryRequest } from "./dto/request/update-category.request";

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

    @Patch('update')
    public async updateCategory(@Body() body: UpdateCategoryRequest){
        return await this.categoryService.updateCategory(body);
    }

    @Delete('delete/:id')
    public async deleteCategory(@Param("id") id: string){
        return await this.categoryService.deleteCategory(id);
    }
}