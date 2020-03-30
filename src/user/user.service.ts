import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entity/user.entity';
import { RegisterInput } from './inputs/registerInput';
import { LoginInput } from './inputs/loginInput';
import { compare, hash } from 'bcryptjs';
import { JwtPayload } from '../models/jwtPayload';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // 全ユーザーを取得
  async users() {
    return await this.userRepository.find();
  }

  async me(payload: JwtPayload): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: payload.userId },
    });
  }

  // ユーザー新規登録
  async register(registerData: RegisterInput) {
    //　パスワードをハッシュ化
    registerData.password = await hash(registerData.password, 12);
    // DBへ保存
    try {
      await this.userRepository.create(registerData).save();
      return true;
    } catch {
      console.log('ユーザーを登録出来ませんでした。');
      return false;
    }
  }

  // ユーザー検証
  async validateUser(loginData: LoginInput): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: loginData.email },
    });

    if (typeof user === 'undefined') {
      throw new UnauthorizedException('ユーザーが見つかりませんでした。');
    }

    const valid = await compare(loginData.password, user.password);
    if (!valid) {
      throw new UnauthorizedException('パスワードが間違ってます。');
    }

    return user;
  }

  async loginStutasTrue(user: User) {
    await this.userRepository.update({ id: user.id }, { loginStatus: true });
  }

  async loginStutasFalse(payload: JwtPayload) {
    try {
      await this.userRepository.update(
        { id: payload.userId },
        { loginStatus: false },
      );
      return true;
    } catch {
      throw new Error('ログインステータスを更新出来ませんでした。');
    }
  }
}
