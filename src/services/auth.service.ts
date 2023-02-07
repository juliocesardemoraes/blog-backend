import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/user.schema';
import { UsersService } from '../services/users.service';
import * as bcrypt from 'bcrypt';

/**
 *
 * Class for authentication
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userDTO: User): Promise<any> {
    const user = await this.usersService.findUser(userDTO.name);

    if (user) {
      const isMatch = await bcrypt.compare(userDTO.password, user.password);

      if (isMatch === false) {
        throw new HttpException(
          'Password or Email is incorrect',
          HttpStatus.BAD_REQUEST,
        );
        console.log('AQUI');
      }

      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
