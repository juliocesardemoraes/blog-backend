import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

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
      jest.spyOn(bcrypt, 'compare').mockImplementation((pass, salt) => {
        return true;
      });

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
      jest.spyOn(bcrypt, 'compare').mockImplementation((pass, salt) => {
        return false;
      });
      await expect(authService.validateUser(userDTO)).rejects.toThrow(
        HttpException,
      );
    });

    it('should return null if credentials are invalid', async () => {
      const userDTO = { name: 'incorrect user', password: 'password' };
      jest.spyOn(usersService, 'findUser').mockResolvedValue(null);
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
