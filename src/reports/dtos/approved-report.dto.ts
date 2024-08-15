import { Transform } from "class-transformer";
import { IsBoolean } from "class-validator";

export class ApprovedReportDto {
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    approved: boolean;
}