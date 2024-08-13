import { IsNumber, IsString, Length, Max, Min, IsLatitude, IsLongitude } from "class-validator";

export class CreateReportDto {
    @IsString()
    @Length(1, 255)
    make: string;
    
    @IsString()
    @Length(1, 255)
    model: string;

    @IsNumber({ maxDecimalPlaces: 0, allowNaN: false })
    @Min(1930)
    @Max(2050)
    year: number;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false })
    @Min(0)
    @Max(1000000)
    price: number;

    @IsLongitude()
    lng: number;

    @IsLatitude()
    lat: number;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false })
    @Min(0)
    @Max(1000000)
    mileage: number;
}