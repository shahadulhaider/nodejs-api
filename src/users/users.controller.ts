import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { User } from './user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUser(id);
  }

  @Get('/search/:search')
  async getUserbyEmailOrName(@Param('search') search: string): Promise<User> {
    return await this.usersService.getUserbyEmailOrName(search);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserData: Partial<UpdateUserDto>,
  ): Promise<User> {
    return await this.usersService.updateUser(id, updateUserData);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.deleteUser(id);
  }
}
