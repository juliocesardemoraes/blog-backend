import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../schemas/user.schema';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let services: UsersService;

  beforeEach(async () => {
    function mockUserModel(data: any) {
      this.data = data;
      this.create = (dataUser) => {
        return dataUser;
      };
      this.save = (dataUser) => {
        return dataUser;
      };
      this.findOne = (dataUser) => {
        return dataUser;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: new mockUserModel('Model__test'),
        },
      ],
    }).compile();

    services = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(services).toBeDefined();
  });

  it('should create a user', async () => {
    const postMock = jest.spyOn(services, 'create');
    const userCreated = await services.create({
      name: 'Ah',
      password: 'true',
    });

    expect(userCreated).toEqual({
      name: 'Ah',
      password: 'true',
    });
    expect(postMock).toHaveBeenCalledTimes(1);
  });

  it('should return a created user', async () => {
    const postMock = jest.spyOn(services, 'findUser');
    const user: User = {
      name: 'Ah',
      password: 'true',
    };
    const userFound = await services.findUser(user);
    expect(userFound).toEqual(user);
    expect(postMock).toHaveBeenCalledTimes(1);
  });
});
