import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ValidateUserRequestDto } from './dto/request/validate-request.dto';
import { ValidateUserResponse } from './dto/response/validate-user.response';
import { RoleService } from '../role/role.service';
import { GetUsersResponse } from './dto/response/get-users.response';
import { JwtService } from '@nestjs/jwt';
import { BaseResponse } from 'src/utilities/BaseResponse.dto';
import { ChangeRoleResponse } from './dto/response/change-role.response';
import { faker } from '@faker-js/faker';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
    private jwtService: JwtService,
  ) {
  }

  public async validateUser(body: ValidateUserRequestDto) {
    var response = new ValidateUserResponse();
    const user = await this.userRepository.findOne({
      where: {
        email: body.email.toLowerCase(),
      },
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          role: 'user.role',
        },
      },
    });

    var payload = {
      sub: null,
      user: null,
    };
    if (!user) {
      try {
        const user = this.userRepository.create();
        user.email = body.email.toLowerCase();
        user.displayName = body.displayName;
        user.authProvider = body.authProvider;
        user.role = await this.roleService.getDefaultRole();

        const save = await this.userRepository.save(user);

        response.success = true;
        response.user = save;
        response.message = 'Usuario creado con exito';
        payload.sub = save.uuid;
        payload.user = save.email;
        response.token = this.jwtService.sign(payload);
        return response;
      } catch (err) {
        response.success = false;
        response.user = null;
        response.message = 'Error al crear el usuario.';
        return response;
      }
    } else {
      if (user.enabled == true) {
        payload.sub = user.uuid;
        payload.user = user.email;
        response.success = true;
        response.user = user;
        response.message = 'Usuario validado con exito';
        response.token = this.jwtService.sign(payload);
        return response;
      }else{
        response.success = false;
        response.user = null;
        response.message = 'Usuario inactivo';
        return response
      }
    }
  }

  public async getUsers() {
    var response = new GetUsersResponse();

    try {
      const find = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'role')
        .getMany();
      response.users = find;
      response.success = true;
      response.message = 'Listado de usuarios';
      return response;
    } catch (err) {
      response.success = false;
      response.message = 'Error al cargar los usuarios';
      return response;
    }
  }

  public async changeRole(uuid: string, uuidRole: string) {
    var response = new ChangeRoleResponse();
    try {
      const find = await this.userRepository.findOne({
        where: {
          uuid: uuid,
        },
      });

      if (find) {
        const findRole = await this.roleService.getRole(uuidRole);
        find.role = findRole;
        await this.userRepository.save(find);
        response.success = true;
        response.message = 'Rol cambiado con exito';
        response.user = find;
        response.role = findRole;
        return response;
      } else {
        response.success = false;
        response.message = 'No se encontro el usuario';
        return response;
      }
    } catch (err) {
      response.success = false;
      response.message = 'Error al cambiar el rol';
      return response;
    }
  }

  async generateFakeUsers(count: number): Promise<void> {
    const existingEmails = await this.userRepository.find().then(users => users.map(user => user.email));

    for (let i = 0; i < count; i++) {
      const email = faker.internet.email();
      const displayName = faker.person.firstName() + ' ' + faker.person.lastName();

      if (!existingEmails.includes(email)) {
        const user = this.userRepository.create({
          email: email.toLowerCase(),
          displayName: displayName,
          authProvider: 'local',
          role: await this.roleService.getDefaultRole(),
        });

        await this.userRepository.save(user);
      }
    }
  }
}
