import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProviderService } from "./provider.service";
import { AddProviderRequest } from "./dto/request/add-provider.request";
import { UpdateProviderRequest } from "./dto/request/update-provider.request";

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

    @Patch('update')
    public async updateProvider(@Body() body: UpdateProviderRequest){
        return await this.providerService.updateProvider(body);
    }

    @Delete('delete/:id')
    public async deleteProvider(@Param("id") uuid: string){
        return await this.providerService.deleteProvider(uuid);
    }
}