import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}