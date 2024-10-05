import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestEntity } from "./request.entity";
import { Repository } from "typeorm";
import { GetRequestsResponse } from "./dto/response/get-requests.response";
import { AddRequestResponse } from "./dto/response/add-request.response";
import { Product } from "../product/product.entity";
import { User } from "../auth/user.entity";
import { AddRequestRequest } from "./dto/request/add-request.request";
import { GetRequestResponse } from "./dto/response/get-request.response";
import { UpdateStateRequest } from "./dto/request/update-state.request";
import { BaseResponse } from "src/utilities/BaseResponse.dto";

@Injectable()
export class RequestService {
    constructor(@InjectRepository(RequestEntity) private readonly requestRepo: Repository<RequestEntity>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(User) private readonly userRepo: Repository<User>) {}

    public async getRequests() {
        var response = new GetRequestsResponse()
        try{
            const find = await this.requestRepo.createQueryBuilder('request')
            .leftJoinAndSelect('request.user', 'user')
            .leftJoinAndSelect('request.product', 'product')
            // .leftJoinAndSelect('request.details', 'details')
            .getMany();

            response.requests = find;
            response.success = true;
            response.message = 'Listado de solicitudes';
            return response;
        }catch(err){
            // console.log(err);
            response.success = false;
            response.message = 'Error al cargar solicitudes';
            return response;
        }
        
    }

    public async getMyRequests(uuidUser: string){

        var response = new GetRequestsResponse();
        try{
            const find = await this.requestRepo.createQueryBuilder('request')
            .leftJoinAndSelect('request.user', 'user')
            .leftJoinAndSelect('request.product', 'product')
            .where('user.uuid = :uuid', { uuid: uuidUser })
            .getMany();
            response.requests = find;
            response.success = true;
            response.message = 'Listado de solicitudes';
            return response;
        }catch(err){
            response.success = false;
            response.message = 'Error al cargar solicitudes';
            return response;
        }
    }

    public async addRequest(req: any, request: AddRequestRequest){
        var response = new AddRequestResponse();

        const productFind = await this.productRepo.findOne({
            where: {
                uuid: request.uuidProduct
            }
        });

        if(!productFind){
            response.success = false;
            response.message = 'No se encontro el producto';
            return response;
        }

        const userFind = await this.userRepo.findOne({
            where: {
                uuid: req.user.sub
            }
        });

        if(!userFind){
            response.success = false;
            response.message = 'No se encontro el usuario';
            return response;
        }

        try{
            const requestToSave = new RequestEntity();
            requestToSave.name = 'Solicitud - Producto ' + productFind.name;
            requestToSave.description = request.description;
            requestToSave.data = request.data;
            requestToSave.user = userFind;
            requestToSave.product = productFind;
            const save = await this.requestRepo.save(requestToSave);
            response.request = save;
            response.success = true;
            response.message = 'Solicitud creada correctamente';
            return response;
        }catch(err){
            console.log(err);
            response.success = false;
            response.message = 'Error al guardar la solicitud';
            return response;
        }
    }

    public async getRequestById(uuid: string){
        var response = new GetRequestResponse();
        try{
            const find = await this.requestRepo.createQueryBuilder('request')
            .leftJoinAndSelect('request.user', 'user')
            .leftJoinAndSelect('request.product', 'product')
            .leftJoinAndSelect('product.provider', 'provider')
            .where('request.uuid = :uuid', { uuid: uuid })
            .getOne();

            response.request = find;
            response.success = true;
            response.message = 'Solicitud encontrada';
            return response;
        }catch(err){
            response.success = false;
            response.message = 'Error al cargar la solicitud';
            return response;
        }
    }

    public async updateRequestState(request: UpdateStateRequest){
        var response = new BaseResponse();
        try{
            const find = await this.requestRepo.findOne({
                where: {
                    uuid: request.uuidRequest
                }
            });
    
            if(find){
                find.state = request.state;
    
                await this.requestRepo.save(find);
                response.success = true;
                response.message = 'Estado actualizado';
                response.data = find;
                return response;
            }else{
                response.success = false;
                response.message = 'Solicitud no encontrada';
                return response;
            }
        }catch(err){
            response.success = false;
            response.message = 'Error al actualizar el estado';
            return response;
        }
    }
}