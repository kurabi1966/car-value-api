import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos';
import { Report } from './report.entity';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimates.dto';
@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private readonly reportsRepository: Repository<Report>) {}

    async create(report: CreateReportDto, user: User) {
        const newReport = this.reportsRepository.create(report);
        newReport.user = user;
        return await this.reportsRepository.save(newReport);
    }

    async getUsersReports(user: User) {
        // return await this.reportsRepository.findBy({user});
        // return []
        const reports = await this.reportsRepository.createQueryBuilder('report')
            .innerJoinAndSelect('report.user', 'user')
            .where('report.userId = :id', { id: user.id })
            .getMany();

        return reports;
    }

    async getAllReports() {
        const reports = await this.reportsRepository.createQueryBuilder('report')
            .innerJoinAndSelect('report.user', 'user')
            .getMany();
        return reports
    }
    async changeApproval(id: string, approved: boolean) {
        const report = await this.reportsRepository.findOne({ where: { id: parseInt(id) }, relations: ['user'] });

        if (!report) {
            throw new Error('report not found');
        }
        report.approved = approved;
        
        return await this.reportsRepository.save(report);
    }

    async getEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
        return this.reportsRepository.createQueryBuilder()
            .select('AVG(price)', 'price')
            .where('approved = true')
            .andWhere('make = :make', { make })
            .andWhere('model = :model', { model })
            .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
            .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
            .andWhere('year - :year BETWEEN -5 AND 5', {year})
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            .setParameters({mileage})
            .limit(3)
            .getRawOne();
    }

}
