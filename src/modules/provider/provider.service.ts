import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Provider } from "./provider.entity";
import { Repository } from "typeorm";
import { ResponseGetProviders } from "./dto/response/response-getproviders";
import { AddProviderRequest } from "./dto/request/add-provider.request";
import { ResponseAddProvider } from "./dto/response/add-provider.response";
import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { UpdateProviderRequest } from "./dto/request/update-provider.request";

@Injectable()
export class ProviderService{
    
    constructor(@InjectRepository(Provider) private readonly providerRepo: Repository<Provider>){}

    public async getProviders(){
        var response = new ResponseGetProviders();
        try{
            const find = await this.providerRepo.find();
            response.providers = find;
            response.success = true;
            response.message = 'Listado de proveedores';
            return response;
        }catch(err){
            response.success = false;
            response.message = 'Error al cargar proveedores';
            return response;
        }
    }

    public async addProvider(body: AddProviderRequest){
        var response = new ResponseAddProvider();
        try{
            const creation = this.providerRepo.create(body);
            const save = await this.providerRepo.save(creation);
            response.success = true;
            response.message = 'Creado correctamente';
            response.provider = save;
            return response;
        }catch(err){
            response.success = false;
            response.message = 'Error al crear el proveedor';
            return response;
        }
    }

    public async updateProvider(body: UpdateProviderRequest){
        var response = new BaseResponse();
        try{
            const find = await this.providerRepo.findOne({
                where: {
                    uuid: body.uuid
                }
            });

            if(find){
                Object.assign(find, body);
                await this.providerRepo.save(find);
                response.success = true;
                response.message = 'Proveedor actualizado correctamente';
                return response;
            }else{
                response.success = false;
                response.message = 'No se encontro el proveedor';
                return response;
            }
        }catch(err){
            response.success = false;
            response.message = 'Error al actualizar el proveedor';
            return response;
        }
    }

    public async deleteProvider(uuid: string){
        var response = new BaseResponse();
        try{
            const find = await this.providerRepo.findOne({
                where: {
                    uuid: uuid
                }
            });

            if(find){
                await this.providerRepo.remove(find);
                response.success = true;
                response.message = 'Proveedor eliminado con éxito';
                return response;
            }else{
                response.success = false;
                response.message = 'No se encontro el proveedor';
                return response;
            }
        }catch(err){
            response.success = false;
            response.message = 'Error al eliminar el proveedor';
            return response;
        }
    }
}