import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "./client.entity";
import { Repository } from "typeorm";
import { AddClientRequest } from "./dto/request/add-client.request";
import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { GetClientsResponse } from "./dto/response/response-getclients";
import { UpdateClientRequest } from "./dto/request/update-client.request";
import { GetClientInfoResponse } from "./dto/response/response-getclient";

@Injectable()
export class ClientService{
    constructor(@InjectRepository(Client) private readonly clientRepo: Repository<Client>){}



    public async addClient(body: AddClientRequest){
        var response = new BaseResponse();
        try{
            const creation = this.clientRepo.create(body);
            const save = await this.clientRepo.save(creation);

            response.success = true;
            response.message = 'Creado correctamente';
            response.data = save;
            return response;
        }catch(err){
            response.success = false;
            response.message = 'Error al crear el cliente';
            return response
        }
    }

    public async getClientInfo(uuid: string){
        var response = new GetClientInfoResponse();

        try{
            const find = await this.clientRepo.findOne({
                where: {
                    uuid: uuid
                }
            });

            if(find){
                response.client = find;
                response.success = true;
                response.message = 'Informacion de cliente';
                return response;
            }else{
                response.success = false;
                response.message = 'No se encontro informacion del cliente';
                return response
            }
        }catch(err){
            response.success = false;
            response.message = 'Error al cargar informacion del cliente';
            return response;
        }

    }

    public async updateClient(body: UpdateClientRequest){
        var response = new BaseResponse();
        try{
            const find = await this.clientRepo.findOne({
                where: {
                    uuid: body.uuid
                }
            });

            if(find){
                Object.assign(find, body);

                await this.clientRepo.save(find);
                response.success = true;
                response.message = 'Actualizado correctamente';
                response.data = find;
                return response;
            }else{
                response.success = false;
                response.message = 'No se encontro el cliente';
                return response
            }   
        }catch(err){
            response.success = false;
            response.message = 'Error al actualizar el cliente';
            return response
        }
    }

    public async deleteClient(uuid: string){
        var response = new BaseResponse();
        try{
            const find = await this.clientRepo.findOne({
                where: {
                    uuid: uuid
                }
            });

            if(find){
                await this.clientRepo.delete(find);
                response.success = true;
                response.message = 'Eliminado correctamente';
                return response;
            }else{
                response.success = false;
                response.message = 'No se encontro el cliente';
                return response
            }   
        }catch(err){
            response.success = false;
            response.message = 'Error al eliminar el cliente';
            return response
        }
    }

    public async getClients(){
        var response = new GetClientsResponse();

        try{
            response.clients = await this.clientRepo.find();
            response.success = true;
            response.message = 'Listado de clientes';
            return response;

        }catch(err){    
            response.success = false;
            response.message = 'Error al cargar clientes';
            return response;
        }
    }
}