import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async signup(email: string, password: string) {
        // check if the user already exists
        const user = await this.usersService.find(email);

        if (user.length > 0) {
            throw new BadRequestException('email already in use');
        }

        // encrypt the password
        // const hashedPassword = await bcrypt.hash(password, 12);
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const hashedPassword = salt + "." + hash.toString('hex');
        const newUser = await this.usersService.create(email, hashedPassword);
        return newUser;
    }   

    async signin(email: string, password: string) {
        // check if the user exists
        const [user] = await this.usersService.find(email);
        if (!user) {
            throw new BadRequestException('bad credentials');
        }

        const [ salt, storedHash ] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('bad credentials');
        }

        return user;

    }
}