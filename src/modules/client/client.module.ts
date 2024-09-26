import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientGateway } from './client.gateway';

@Module({
    imports: [
        TypeOrmModule.forFeature([Client]),
    ],
    providers: [ClientService, ClientGateway],
    controllers: [ClientController],
})
export class ClientModule {}
