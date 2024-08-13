import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service"
import { User } from "./user.entity"
import { BadRequestException } from "@nestjs/common";


describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;
    let users: User[] = [];
    // afterEach(() => {
    //     console.log('users', users);
    // })

    beforeEach(async () => {
        users = [] as User[];
        fakeUsersService = {
        find: (email: string) => {
            const filteredUsers = users.filter(user => user.email === email)
            // console.log('filteredUsers', filteredUsers);
            return Promise.resolve(filteredUsers)
        },
        create: (email: string, password: string) => {
            const user = {
                id: Math.floor(Math.random() * 9999999), 
                email,
                password
            } as User;
            users.push(user);
            return Promise.resolve(user);
        }
    }

    const module = await Test.createTestingModule({
        providers: [
            AuthService,
            {
                provide: UsersService,
                useValue: fakeUsersService
            }
        ]
        }).compile()

        service = module.get<AuthService>(AuthService);
    });

    it('can create an instance of auth service', async () => {
        // console.log('can create an instance of auth service');
        expect(service).toBeDefined();
    });

    it('can signup a user', async () => {
        // console.log('can signup a user');
        const user = await service.signup('john@test.com', '!Q2w#E4r');
        expect(user).toBeDefined();
        expect(user.password).not.toEqual('!Q2w#E4r');

        const [ salt, hash ] = user.password.split('.');

        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with email that is in use', async () => {
        // console.log('throws an error if user signs up with email that is in use');
        await service.signup('asdf@asdf.com', 'asdf')
        await expect(service.signup('asdf@asdf.com', '1234')).rejects.toThrow(
          BadRequestException,
        );
    });

    it('signin success if the user provides correct credentials', async () => {
        // console.log('signin success if the user provides correct credentials');
        await service.signup('john@test.com', '!Q2w#E4r');
        const user = await service.signin('john@test.com', '!Q2w#E4r');
        expect(user).toBeDefined();
    });

    it('throws an error if user signs in with wrong password', async () => {
        // console.log('throws an error if user signs in with wrong password');
        await service.signup('john@test.com', '!Q2w#E4r');
        await expect(service.signin('john@test.com', 'abcd')).rejects.toThrow(
          BadRequestException,
        );
    })

    it('throws an error if user signs in with wrong email', async () => {
        // console.log('throws an error if user signs in with wrong email');
        await expect(service.signin('john@test.com', 'abcd')).rejects.toThrow(
          BadRequestException,
        );
    })
});