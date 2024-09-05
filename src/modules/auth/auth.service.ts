import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { ValidateUserRequestDto } from "./dto/request/validate-request.dto";
import { ValidateUserResponse } from "./dto/response/validate-user.response";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    public async validateUser(body: ValidateUserRequestDto) {
        var response = new ValidateUserResponse();
        const user = await this.userRepository.findOne({
            where: {
                email: body.email.toLowerCase()
            }
        });

        if (!user) {
            try {
                const user = this.userRepository.create();
                user.email = body.email.toLowerCase();
                user.displayName = body.displayName;
                user.authProvider = body.authProvider;

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
}