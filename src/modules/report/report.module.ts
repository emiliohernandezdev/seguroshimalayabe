import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Category } from '../category/category.entity';
import { Client } from '../client/client.entity';
import { Product } from '../product/product.entity';
import { Provider } from '../provider/provider.entity';
import { RequestEntity } from '../request/request.entity';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Category,
            Client,
            Product,
            Provider,
            RequestEntity
        ])
    ],
    providers: [ReportService],
    controllers: [ReportController]
})
export class ReportModule {}
