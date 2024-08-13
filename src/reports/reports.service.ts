import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos';
import { Report } from './report.entity';
@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private readonly reportsRepository: Repository<Report>) {}

    async create(report: CreateReportDto) {
        const newReport = this.reportsRepository.create(report);
        return await this.reportsRepository.save(newReport);
    }
}
