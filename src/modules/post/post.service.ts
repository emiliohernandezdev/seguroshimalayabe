import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { Repository } from "typeorm";
import { GetAllPostsResponse } from "./dto/response/get-all-posts.response";
import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { AddPostRequest } from "./dto/request/add-post.request";

@Injectable()
export class PostService{
    constructor(@InjectRepository(Post) private readonly postRepo: Repository<Post>){}

    public async getAllPosts(){
        var response = new GetAllPostsResponse();
        try{
            const find = await this.postRepo.find();
            response.posts = find;
            response.success = true;
            response.message = 'Listado de posts';
            return response;
        }catch(err){
            response.success = false;
            response.message = 'Error al cargar los posts';
            return response;
        }
    }

    public async getFeed(limit: number){
        const now = new Date();
        var response = new GetAllPostsResponse();
        try{
            const find = await this.postRepo.createQueryBuilder('post')
        .where("post.startDate <= :now", { now: now })
        .andWhere("post.endDate IS NULL OR post.endDate >= :now", { now: now })
        .orderBy('post.startDate', 'DESC')
        .limit(limit)
        .getMany();

        
        response.success = true;
        response.message = 'Listado de posts';
        response.posts = find;
        return response;
        }catch(err){
            response.success = false;
            response.message = 'Error al cargar los posts';
            return response;
        }
    }

    public async addPost(request: AddPostRequest){ 
        var response = new BaseResponse();
        try{
            const creation = this.postRepo.create(request);
            const save = await this.postRepo.save(creation);
            response.success = true;
            response.message = 'Post creado correctamente';
            response.data = save;
            return response;
        }catch(err){
            response.success = false;
            response.message = 'Error al crear el post';
            return response;
        }
    }
}