import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Customer } from 'src/customers/entities/customer.entity';
@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}
  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  findAll() {
    return `This action returns all auths`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async register(userDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: {
          user_login: userDto.email,
        },
      });

      if (existingUser) {
        throw new HttpException(
          'Email already in use.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
      if (!passwordRegex.test(userDto.user_password)) {
        throw new HttpException(
          'Password does not meet the requirements.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await bcrypt.hash(userDto.user_password, 10);

      // Create the user and save it
      const user = this.usersRepository.create({
        user_name: userDto.user_name,
        user_login: userDto.email,
        user_password: hashedPassword,
        user_role: 'customer',
      });

      const user_ = await this.usersRepository.save(user); // Make sure to await the save operation

      // Create the customer linked to the user and save it
      const customer = this.customersRepository.create({
        cus_name: user.user_name,
        user: user_, // This links the customer to the user
      });

      const customer_ = await this.customersRepository.save(customer); // Await the save operation
      user_.customer = customer_;
      await this.usersRepository.save(user_); //

      // Fetch and return the user with customer information
      return await this.usersRepository.findOne({
        where: { user_login: user.user_login },
        relations: ['customer'], // Make sure 'customer' is the correct relation name
      });
    } catch (error) {
      console.error(error); // More specific error logging
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { user_login: email },
      relations: ['customer'],
    });
    if (user && (await this.comparePasswords(password, user.user_password))) {
      return user;
    } else {
      throw new HttpException('Not found User', HttpStatus.NOT_FOUND);
    }
  }
  //
  private async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
