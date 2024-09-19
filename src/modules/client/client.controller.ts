import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ClientService } from "./client.service";
import { AddClientRequest } from "./dto/request/add-client.request";
import { UpdateClientRequest } from "./dto/request/update-client.request";

@Controller('client')
export class ClientController{
    constructor(private readonly clientService: ClientService){}

    @Get()
    public async getClients(){
        return await this.clientService.getClients();
    }

    @Get(':uuid')
    public async getClientInfo(@Param("uuid") uuid: string){
        return await this.clientService.getClientInfo(uuid)
    }

    @Post('add')
    public async addClient(@Body() body: AddClientRequest){
        return await this.clientService.addClient(body)
    }

    @Patch('update')
    public async updateClient(@Body() body: UpdateClientRequest){
        return await this.clientService.updateClient(body)
    }

    @Delete('delete/:uuid')
    public async deleteClient(@Param("uuid") uuid: string){
        return await this.clientService.deleteClient(uuid)
    }
}