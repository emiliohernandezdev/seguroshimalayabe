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
import { Role } from './modules/role/role.entity';
import { SystemModule } from './modules/system/system.module';
import { Config } from './modules/system/config.entity';
import { RequestDetail } from './modules/request/request-detail.entity';
import { ProviderModule } from './modules/provider/provider.module';
import { Provider } from './modules/provider/provider.entity';
import { ClientModule } from './modules/client/client.module';
import { Client } from './modules/client/client.entity';
import { PostModule } from './modules/post/post.module';
import { Post } from './modules/post/post.entity';
import { ReportModule } from './modules/report/report.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
      envFilePath: '.prod.env'
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
          RequestDetail,
          Category,
          Product,
          Role,
          Provider,
          Client,
          Config,
          Post
        ],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
          cert: readFileSync('./ca.pem'),
        },
        extra: {
          rejectUnauthorized: false
        }
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    RoleModule,
    RequestModule,
    ProductModule,
    CategoryModule,
    SystemModule,
    ProviderModule,
    ClientModule,
    PostModule,
    ReportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
