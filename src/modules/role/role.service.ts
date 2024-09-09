import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./role.entity";
import { Repository } from "typeorm";
import { GetRolesResponse } from "./dto/response/get-roles.response";

@Injectable()
export class RoleService{
    constructor(@InjectRepository(Role) private readonly roleRepo: Repository<Role>){}

    public async getDefaultRole(){
        return await this.roleRepo.findOne({where: {name: "user"}});
    }

    public async getAllRoles(){
        var response = new GetRolesResponse();

        try{
            response.roles = await this.roleRepo.find();
            response.success = true;
            response.message = "Listado de roles";
            return response;

        }catch(err){    
            response.success = false;
            response.message = "Error al cargar roles"; 
            return response;
        }
    }
}