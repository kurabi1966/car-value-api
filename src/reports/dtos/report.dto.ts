import { Expose, Transform } from "class-transformer";

export class ReportDto {
    @Expose()
    id: number;

    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    year: number;

    @Expose()
    price: number;

    @Expose()
    lng: number;

    @Expose()
    lat: number;

    @Expose()
    mileage: number;

    @Transform(({ obj }) => {return obj.user.id})
    @Expose()
    userId: number;

    @Expose()
    approved: boolean;
}