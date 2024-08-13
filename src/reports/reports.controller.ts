import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/users/guards';
import { CurrentUser } from 'src/users/decorators';
import { User } from 'src/users/user.entity';
import { ApprovedReportDto, ReportDto } from './dtos';
import { SerializeReport } from 'src/interceptors/serialize.interceptor';


@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @SerializeReport(ReportDto)
    create(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    @SerializeReport(ReportDto)
    approveReport(@Param('id') id: string, @Body() approvedReportDto: ApprovedReportDto) {
        return this.reportsService.changeApproval(id, approvedReportDto.approved);
    }

    // @Get()
    // @UseGuards(AuthGuard)
    // getAllReports(@CurrentUser() user: User) {
    //     console.log(user);
    //     // return this.reportsService.getUsersReports(user.id);
    // }
}
