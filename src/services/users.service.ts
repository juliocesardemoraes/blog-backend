import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) public userModel: Model<UserDocument>) {}

  /**
   * Function for creating users
   * IUserDTO = {name: string, password: string}
   * @param {User} createUserDto
   * @returns
   */
  async create(createUserDto: User): Promise<User> {
    return await this.userModel.create({ ...createUserDto });
  }

  /**
   * Function for fetching one specific user for authentication
   * IUserDTO = {name: string, password: string}
   * @param {User} createUserDto
   * @returns
   */
  async findUser(createUserDto: User): Promise<any> {
    return await this.userModel.findOne({ ...createUserDto });
  }

  /**
   * Function for fetching one or more users based on name
   * IUserDTO = {name: string, password: string}
   * @param {User} createUserDto
   * @returns
   */
  async find(name: string): Promise<any> {
    return this.userModel.find({ name: name });
  }
}
