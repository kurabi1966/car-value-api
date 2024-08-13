import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

    async create(email: string, password: string) {
        const user = this.usersRepository.create({email, password});
        return await this.usersRepository.save(user);
    }

    async find(email: string) {

        return await this.usersRepository.find({where: {email}});
    }
    async findAll() {
        return await this.usersRepository.find();
    }

    async findOne(id: number) {

        if(!id) {
            throw new NotFoundException('user not found');
        }
        const user = await this.usersRepository.findOneBy({id});

        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        return await this.usersRepository.remove(user);
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        Object.assign(user, attrs);
        return await this.usersRepository.save(user);
    }
}
