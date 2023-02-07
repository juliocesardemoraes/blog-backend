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

@Controller()
export class UserController {
  constructor(private readonly UsersService: UsersService) {}

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
