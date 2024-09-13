import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Config } from "./config.entity";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { GetAppConfigResponse } from "./dto/response/get-app-config.response";

@Injectable()
export class SystemService{
    constructor(@InjectRepository(Config) private readonly configRepo: Repository<Config>){}


    async generateConfig(){
        const settings: Config[] = [
            {
                uuid: uuidv4(),
                description: "Color de la aplicacion",
                name: "Color primario de la aplicacion",
                value: "#0096FF",
                key: "COLOR.PRIMARY",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                uuid: uuidv4(),
                description: "Color de la aplicacion",
                name: "Color secundario de la aplicacion",
                value: "#554DEB",
                key: "COLOR.SECONDARY",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        settings.forEach(async (setting) => {
            const find = await this.configRepo.findOne({
                where: {
                    key: setting.key
                }
            });

            if (!find) {
                const creation = this.configRepo.create();
                creation.createdAt = setting.createdAt;
                creation.description = setting.description;
                creation.key = setting.key;
                creation.name = setting.name;
                creation.uuid = setting.uuid;
                creation.value = setting.value;

                await this.configRepo.save(creation);
                Logger.log(`Configuración ${creation.key} guardada`);
            }
        })
    }


    async getAppConfig(){
        var response = new GetAppConfigResponse();

        try{
            response.config = await this.configRepo.find();
            response.success = true;
            response.message = "Listado de configuraciones";
            return response;
        }catch(err){
            response.success = false;
            response.message = "Error al cargar configuraciones";
            return response;
        }
    }
}