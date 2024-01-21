import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose, { Model, isValidObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getUserbyEmailOrName(search: string): Promise<User> {
    const user = await this.userModel.findOne({
      $or: [
        {
          name: search,
        },
        {
          email: search,
        },
      ],
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async updateUser(
    id: string,
    updateUserData: Partial<UpdateUserDto>,
  ): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: id },
      updateUserData,
      { new: true },
    );

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.userModel.findOneAndDelete(
      { _id: id },
      { new: true },
    );

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
