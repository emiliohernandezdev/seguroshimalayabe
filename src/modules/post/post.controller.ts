import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PostService } from "./post.service";
import { AddPostRequest } from "./dto/request/add-post.request";

@Controller('posts')
export class PostController{
    
    constructor(private readonly postService: PostService){}

    @Get()
    public async getAllPosts(){
        return await this.postService.getAllPosts();
    }

    @Get('feed/:limit')
    public async getFeed(@Param("limit") limit: number){
        return await this.postService.getFeed(limit);
    }

    @Post('add')
    public async addPost(@Body() request: AddPostRequest){
        return await this.postService.addPost(request);
    }
}