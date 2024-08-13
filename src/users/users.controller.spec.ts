import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;
  // let users: User[] = [];

  beforeEach(async () => {
    // users = [];

    fakeUsersService = {
      find: (email: string) => {
        return Promise.resolve([{id: 1, email, password: 'password'} as User]);
      },
      findOneById: (id: number) => {
        // const user = users.find(user => user.id === id) as User;
        return Promise.resolve({id, email: 'lina@kurabi.net', password: 'password'} as User);
      },

      // remove: (id: number) => {

      // },

      // update: (id: number, attrs: Partial<User>) => {

      // },
    };

    fakeAuthService = {
      // signin: () => {},
      // signup: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAll('john@test.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('john@test.com');
  });

  it('findOneById returns a single user with the given id', async () => {
    const user = await controller.findOneById(1);
    expect(user.email).toEqual('lina@kurabi.net');
  })
});
