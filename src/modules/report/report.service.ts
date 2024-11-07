import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../auth/user.entity";
import { Repository } from "typeorm";
import { Category } from "../category/category.entity";
import { Client } from "../client/client.entity";
import { Product } from "../product/product.entity";
import { Provider } from "../provider/provider.entity";
import { RequestEntity } from "../request/request.entity";
import { ReportsResponse } from "./dto/response/reports.response";

@Injectable()
export class ReportService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Client) private readonly clientRepository: Repository<Client>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Provider) private readonly providerRepository: Repository<Provider>,
        @InjectRepository(RequestEntity) private readonly requestRepository: Repository<RequestEntity>) { }


    public async getReports() {
        var response = new ReportsResponse();
        try {
            const users = await this.userRepository.count();
            const categories = await this.categoryRepository.count();
            const clients = await this.clientRepository.count();
            const products = await this.productRepository.count();
            const providers = await this.providerRepository.count();
            const requests = await this.requestRepository.count();

            response.users = users;
            response.categories = categories;
            response.clients = clients;
            response.products = products;
            response.providers = providers;
            response.requests = requests;

            response.success = true;
            response.message = 'Listado de informacion';
            return response;
        } catch (err) {
            response.success = false;
            response.message = 'Error al cargar informacion';
            return response;
        }

    }
}