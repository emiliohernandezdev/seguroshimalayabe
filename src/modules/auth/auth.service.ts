import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { ValidateUserRequestDto } from "./dto/request/validate-request.dto";
import { ValidateUserResponse } from "./dto/response/validate-user.response";
import { RoleService } from "../role/role.service";
import { GetUsersResponse } from "./dto/response/get-users.response";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService) { }

    public async validateUser(body: ValidateUserRequestDto) {
        var response = new ValidateUserResponse();
        const user = await this.userRepository.findOne({
            where: {
                email: body.email.toLowerCase()
            },
            join: {
                alias: 'user',
                leftJoinAndSelect: {
                    role: 'user.role'
                }
            }
        });

        if (!user) {
            try {
                const user = this.userRepository.create();
                user.email = body.email.toLowerCase();
                user.displayName = body.displayName;
                user.authProvider = body.authProvider;
                user.role = await this.roleService.getDefaultRole()

                const save = await this.userRepository.save(user);

                response.success = true;
                response.user = save;
                response.message = 'Usuario creado con exito';
                return response;
            } catch (err) {
                response.success = false;
                response.user = null;
                response.message = 'Error al crear el usuario.';
                return response;
            }
        }else{
            response.success = true;
            response.user = user;
            response.message = 'Usuario validado con exito';
            return response;
        }
    }

    public async getUsers(){
        var response = new GetUsersResponse();

        try{
            const find = await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .getMany()
            response.users = find;
            response.success = true;
            response.message = 'Listado de usuarios';
            return response;
        }catch(err){
            response.success = false;
            response.message = 'Error al cargar los usuarios';
            return response;
        }
    }
}