import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProviderService } from "./provider.service";
import { AddProviderRequest } from "./dto/request/add-provider.request";

@Controller('provider')
export class ProviderController{
    
    constructor(private readonly providerService: ProviderService){}

    @Get()
    public async getProviders(){
        return await this.providerService.getProviders();
    }

    @Post('add')
    public async addProvider(@Body() body: AddProviderRequest){
        return await this.providerService.addProvider(body);
    }
}