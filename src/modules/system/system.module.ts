import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './config.entity';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Config
        ])
    ],
    providers: [SystemService],
    controllers: [SystemController]
})
export class SystemModule {}
