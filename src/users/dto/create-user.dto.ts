import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(8, 20)
  user_name: string;
  @IsEmail()
  email: string;

  user_password: string;

  // user_role: string;
}
