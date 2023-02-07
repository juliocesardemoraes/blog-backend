import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) public userModel: Model<UserDocument>) {}

  /**
   * Function for creating users
   * IUserDTO = {name: string, password: string}
   * @param {User} userDto
   * @returns
   */
  async create(userDto: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(userDto.password, salt);
    const userHashed = { ...userDto, password: hash };
    return await this.userModel.create({ ...userHashed });
  }

  /**
   * Function for fetching one specific user for authentication
   * IUserDTO = {name: string, password: string}
   * @param {string} userDto
   * @returns
   */
  async findUser(name: string): Promise<any> {
    return await this.userModel.findOne({ name: name });
  }

  /**
   * Function for fetching one or more users based on name
   * @param {string} name
   * @returns
   */
  async find(name: string): Promise<any> {
    return this.userModel.find({ name: name });
  }
}
