import { Transform } from "class-transformer";
import { IsEmail, IsStrongPassword } from "class-validator";

export class SignupDto {
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string;
}