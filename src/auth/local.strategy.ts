import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const userDTO: User = {
      name: username,
      password: password,
    };
    const user = await this.authService.validateUser(userDTO);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
