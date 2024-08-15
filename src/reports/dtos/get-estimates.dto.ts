import { IsNumber, IsString, Length, Max, Min, IsLatitude, IsLongitude, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
export class GetEstimateDto {
    @IsString()
    @Length(1, 255)
    @Transform(({ value }) => value.toLowerCase())
    make: string;
    
    @IsString()
    @Length(1, 255)
    @Transform(({ value }) => value.toLowerCase())
    model: string;
    
    @IsNumber({ maxDecimalPlaces: 0, allowNaN: false })
    @Min(1930)
    @Max(2050)
    @Transform(({ value }) => parseInt(value))
    year: number;
    
    @IsLongitude()
    @Transform(({ value }) => parseFloat(value))
    lng: number;
    
    @IsLatitude()
    @Transform(({ value }) => parseFloat(value))
    lat: number;
    
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false })
    @Min(0)
    @Max(1000000)
    @Transform(({ value }) => parseFloat(value))
    mileage: number;
}