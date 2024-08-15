import { Transform } from "class-transformer";
import { IsEmail, IsOptional, IsStrongPassword } from "class-validator";

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    @IsOptional()
    password?: string;
}