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
  async saveRegister(nickName: string, email: string, password: string) {
    //　パスワードをハッシュ化
    const hashedPassword = await hash(password, 12);
    // DBへ保存
    try {
      await this.userRepository
        .create({
          nickname: nickName,
          email: email,
          password: hashedPassword,
        })
        .save();
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

  // テストユーザー専用の検証メソッド
  async validateTestUser(email: string, password: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email, password: password },
    });
  }

  async executeDelete(
    nickName: string,
    email: string,
    password: string,
    userData: User,
  ) {
    // テストユーザーは削除出来ないようにする
    if (email === 'test@test.com') {
      throw new UnauthorizedException('テストユーザーは削除出来ません。');
    }
    // パスワード検証
    const valid = await compare(password, userData.password);
    if (!valid) {
      throw new UnauthorizedException('パスワードが間違ってます。');
    }
    // 全て一致したらユーザーを削除
    if (
      nickName === userData.nickname &&
      email === userData.email &&
      valid === true
    ) {
      await this.userRepository.delete(userData);
    } else {
      throw new UnauthorizedException(
        'メールアドレス、又はニックネームが違います。',
      );
    }
  }

  async loginStutasTrue(user: User) {
    await this.userRepository.update({ id: user.id }, { loginstatus: true });
  }

  async loginStutasFalse(payload: JwtPayload) {
    try {
      await this.userRepository.update(
        { id: payload.userId },
        { loginstatus: false },
      );
      return true;
    } catch {
      throw new Error('ログインステータスを更新出来ませんでした。');
    }
  }
}
