import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create0user';
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
  async getallUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}
