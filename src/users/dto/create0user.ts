import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
