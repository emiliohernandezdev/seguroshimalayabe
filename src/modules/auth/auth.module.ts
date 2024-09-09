import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RoleService } from '../role/role.service';
import { Role } from '../role/role.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role])
    ],
    controllers: [AuthController],
    providers: [AuthService, RoleService]
})
export class AuthModule {}
