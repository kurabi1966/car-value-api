import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/users/guards';
@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    create(@Body() body: CreateReportDto) {
        return this.reportsService.create(body);
    }
}
