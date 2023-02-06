import { User } from '../schemas/user.schema';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller()
export class UserController {
  constructor(
    private authService: AuthService,
    private readonly UsersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() userDTO: User) {
    return this.authService.login(userDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('users/create')
  async createUser(@Body() userDTO: User) {
    return this.UsersService.create(userDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/find')
  async find(@Body() userDTO: User) {
    return this.UsersService.find(userDTO.name);
  }
}
