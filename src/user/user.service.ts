import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';

import { User } from './entity/user.entity';
import { RegisterUserInput } from './inputs/registerUserInput';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // 全ユーザーを取得
  async users() {
    return await this.userRepository.find();
  }

  // ユーザー新規登録
  async registerUser(data: RegisterUserInput) {
    // パスワードをハッシュ化
    data.password = await bcrypt.hash(data.password, 12);
    return await this.userRepository.create(data).save();
  }
}
