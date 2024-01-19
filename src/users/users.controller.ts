import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create0user';

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
