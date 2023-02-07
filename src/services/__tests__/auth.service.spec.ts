import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/user.schema';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(() => {
    usersService = new UsersService(null);
    jwtService = new JwtService({ secret: 'secret' });
    authService = new AuthService(usersService, jwtService);
  });

  describe('validateUser', () => {
    it('should return a user if credentials are valid', async () => {
      const userDTO: User = {
        name: 'testuser',
        password: 'testpassword',
      };
      const returnOnlyName = {
        name: 'testuser',
      };
      jest.spyOn(usersService, 'findUser').mockResolvedValue(userDTO);

      const result = await authService.validateUser(userDTO);
      expect(result).toEqual(returnOnlyName);
    });

    it('should return null if credentials are invalid', async () => {
      const userDTO: User = {
        name: 'testuser',
        password: 'incorrectpassword',
      };
      jest.spyOn(usersService, 'findUser').mockResolvedValue({
        username: 'testuser',
        password: 'testpassword',
      });

      const result = await authService.validateUser(userDTO);
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const user = {
        name: 'testuser',
        userId: '1',
      };

      const result = await authService.login(user);
      expect(result).toHaveProperty('access_token');
    });
  });
});
