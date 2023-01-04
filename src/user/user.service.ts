import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: Repository<User>) {}

  async register(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const exitUser = await this.userRepository.findOne({
      where: { username },
    });
    if (exitUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
