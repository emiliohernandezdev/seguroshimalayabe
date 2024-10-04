import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from './request.entity';
import { RequestService } from './request.service';
import { RequestDetail } from './request-detail.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from '../auth/user.entity';
import { Product } from '../product/product.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([RequestEntity, RequestDetail, User, Product]),
    ],
    controllers: [RequestController],
    providers: [RequestService, JwtService]
})
export class RequestModule {}
