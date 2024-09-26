import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestEntity } from "./request.entity";
import { Repository } from "typeorm";
import { GetRequestsResponse } from "./dto/response/get-requests.response";

@Injectable()
export class RequestService {
    constructor(@InjectRepository(RequestEntity) private readonly requestRepo: Repository<RequestEntity>) {}

    public async getRequests() {
        var response = new GetRequestsResponse()
        try{
            const find = await this.requestRepo.createQueryBuilder('request')
            .leftJoinAndSelect('request.user', 'user')
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
}