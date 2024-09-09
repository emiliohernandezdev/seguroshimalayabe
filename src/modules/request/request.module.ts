import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from './request.entity';
import { RequestService } from './request.service';
import { RequestDetail } from './request-detail.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([RequestEntity, RequestDetail])
    ],
    controllers: [RequestController],
    providers: [RequestService]
})
export class RequestModule {}
