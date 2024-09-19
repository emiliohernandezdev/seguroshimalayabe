import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Provider } from "./provider.entity";
import { Repository } from "typeorm";
import { ResponseGetProviders } from "./dto/response/response-getproviders";
import { AddProviderRequest } from "./dto/request/add-provider.request";
import { ResponseAddProvider } from "./dto/response/add-provider.response";

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
}