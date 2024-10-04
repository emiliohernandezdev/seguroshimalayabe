import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { RequestService } from "./request.service";
import { AuthGuard } from "../auth/auth.guard";
import { AddRequestRequest } from "./dto/request/add-request.request";

@Controller('request')
export class RequestController {
    constructor(private readonly requestService: RequestService){}

    @Get('all')
    public async getRequests() {
        return await this.requestService.getRequests();
    }


    @UseGuards(AuthGuard)
    @Get('my')
    public async getMyRequests(@Req() req: any){
        return await this.requestService.getMyRequests(req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Post('add')
    public async addRequest(@Req() req:any, @Body() request: AddRequestRequest){
        return await this.requestService.addRequest(req, request);
    }
}