import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninDto {
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @IsNotEmpty()
    password: string;
}