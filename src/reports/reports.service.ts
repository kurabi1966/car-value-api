import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos';
import { Report } from './report.entity';
import { User } from 'src/users/user.entity';
@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private readonly reportsRepository: Repository<Report>) {}

    async create(report: CreateReportDto, user: User) {
        const newReport = this.reportsRepository.create(report);
        newReport.user = user;
        return await this.reportsRepository.save(newReport);
    }

    async getUsersReports(id: number) {
        // TODO: Find all reports of a user
        // return await this.reportsRepository.find({where: {user: {id}}});
        return []
    }

    async changeApproval(id: string, approved: boolean) {
        const report = await this.reportsRepository.findOne({ where: { id: parseInt(id) }, relations: ['user'] });

        if (!report) {
            throw new Error('report not found');
        }
        report.approved = approved;
        
        return await this.reportsRepository.save(report);
    }
}
