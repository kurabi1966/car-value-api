import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AdminGuard, AuthGuard, UserOnlyGuard } from 'src/users/guards';
import { CurrentUser } from 'src/users/decorators';
import { User } from 'src/users/user.entity';
import { ApprovedReportDto, ReportDto } from './dtos';
import { SerializeReport } from 'src/interceptors/serialize.interceptor';
import { GetEstimateDto } from './dtos/get-estimates.dto';


@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Post()
    @UseGuards(UserOnlyGuard)
    @SerializeReport(ReportDto)
    create(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    @SerializeReport(ReportDto)
    approveReport(@Param('id') id: string, @Body() approvedReportDto: ApprovedReportDto) {
        return this.reportsService.changeApproval(id, approvedReportDto.approved);
    }

    @Get()
    @UseGuards(AuthGuard)
    @SerializeReport(ReportDto)
    getAllUserReports(@CurrentUser() user: User) {
        return this.reportsService.getUsersReports(user);
    }
    @Get('admin')
    @UseGuards(AdminGuard)
    @SerializeReport(ReportDto)
    getAllReports() {
        return this.reportsService.getAllReports();
    }

    @Get('get-estimate')
    @UseGuards(AuthGuard)
    getEstimate(@Query() query: GetEstimateDto) {
        // TODO use @Body() instead of @Query
        return this.reportsService.getEstimate(query);
    }
}
