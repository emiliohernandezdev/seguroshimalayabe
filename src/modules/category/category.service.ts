import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { GetCategoriesResponse } from "./dto/response/get-categories.response";
import { AddCategoryRequest } from "./dto/request/add-category.request";
import { AddCategoryResponse } from "./dto/response/add-category.response";

@Injectable()
export class CategoryService{
    constructor(@InjectRepository(Category) private readonly categoryRepo: Repository<Category>){}

    public async getCategories(){
        var response = new GetCategoriesResponse();
        try{
            response.categories = await this.categoryRepo.find();
            response.success =true;
            response.message = 'Listado de categorias';
            return response;
        }catch(err){    
            response.success = false;
            response.message = 'Error al cargar categorias';
            return response;
        }
    }

    public async addCategory(body: AddCategoryRequest){
        var response = new AddCategoryResponse();
        try{
            const category = this.categoryRepo.create();
            category.name = body.name;
            category.description = body.description;
            category.color = body.color;

            const save = await this.categoryRepo.save(category);

            response.category = save;
            response.success = true;
            response.message = 'Creado correctamente';
            return response;

        }catch(err){
            response.success = false;
            response.category = null;
            response.message = 'Error al crear la categoria';
            return response;
        }
    }
}