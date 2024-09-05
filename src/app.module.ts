import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoleModule } from './modules/role/role.module';
import { User } from './modules/auth/user.entity';
import { RequestModule } from './modules/request/request.module';
import { RequestEntity } from './modules/request/request.entity';
import { ProductModule } from './modules/product/product.module';
import { Product } from './modules/product/product.entity';
import { CategoryModule } from './modules/category/category.module';
import { Category } from './modules/category/category.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.getOrThrow<string>('DB_HOST', 'localhost'),
        port: cfg.getOrThrow<number>('DB_PORT', 3306),
        username: cfg.getOrThrow<string>('DB_USER', 'pg'),
        password: cfg.getOrThrow<string>('DB_PWD', 'password'),
        database: cfg.getOrThrow<string>('DB_NAME', 'defaultdb'),
        entities: [
          User,
          RequestEntity,
          Category,
          Product
        ],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
          cert: readFileSync('./ca.pem'),
        },
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    RoleModule,
    RequestModule,
    ProductModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
