import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RoleService } from '../role/role.service';
import { Role } from '../role/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGateway } from './auth.gateway';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (cfg: ConfigService) => ({
                global: true,
                secret: cfg.getOrThrow<string>('JWT_SECRET', 'secret'),
                signOptions: { expiresIn: '1d' }
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, RoleService, AuthGateway],
    exports: [AuthModule]
})
export class AuthModule {}
