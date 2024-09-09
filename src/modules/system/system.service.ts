import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Config } from "./config.entity";
import { Repository } from "typeorm";

@Injectable()
export class SystemService{
    constructor(@InjectRepository(Config) private readonly configRepo: Repository<Config>){}

    
}