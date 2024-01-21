import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { Cache } from 'cache-manager';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    const cachedData = await this.cacheService.get<User[]>('users');

    if (cachedData) {
      return cachedData;
    }

    const users = await this.userModel.find();

    await this.cacheService.set('users', users);

    return users;
  }

  async getUser(id: string): Promise<User> {
    const cachedData = await this.cacheService.get<User>(`user-${id}`);

    if (cachedData) {
      return cachedData;
    }
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    await this.cacheService.set(`user-${id}`, user);

    return user;
  }

  async getUserbyEmailOrName(search: string): Promise<User> {
    const cachedData = await this.cacheService.get<User>(`user-${search}`);

    if (cachedData) {
      return cachedData;
    }

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

    await this.cacheService.set(`user-${search}`, user);

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
