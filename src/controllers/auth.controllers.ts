import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { AuthService } from 'src/services/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() userDTO: User) {
    return this.authService.login(userDTO);
  }
}
