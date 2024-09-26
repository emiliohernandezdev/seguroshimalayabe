import { Controller, Get } from "@nestjs/common";
import { RequestService } from "./request.service";

@Controller('request')
export class RequestController {
    constructor(private readonly requestService: RequestService){}

    @Get('all')
    public async getRequests() {
        return await this.requestService.getRequests();
    }
}