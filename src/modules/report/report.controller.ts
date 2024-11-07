import { Controller, Get } from "@nestjs/common";
import { ReportService } from "./report.service";

@Controller('report')
export class ReportController{
    constructor(private readonly reportService: ReportService){}

    @Get('all')
    public async getReports(){
        return await this.reportService.getReports();
    }
}