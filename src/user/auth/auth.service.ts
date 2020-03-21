import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { User } from '../entity/user.entity';
import { LoginInput } from '../inputs/loginInput';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  // ユーザー検証
  async validateUser(loginData: LoginInput): Promise<boolean> {
    const user = await User.findOne({
      where: { email: loginData.email },
    });
    if (!user) {
      throw new UnauthorizedException('ユーザーが見つかりませんでした。');
    }

    const valid = await compare(loginData.password, user.password);
    if (!valid) {
      throw new UnauthorizedException('パスワードが間違ってます。');
    }

    return true;
  }

  // アクセストークン生成
  async accessToken(user: User) {
    return this.jwtService.sign({ userId: user.id });
  }

  // ログイン済みか検証
  async verify(authorization: string) {
    try {
      const token = authorization.split(' ')[1];
      await this.jwtService.verify(token);
      return true;
    } catch {
      throw new Error('認証していません。');
    }
  }

  async verifyOfUserId(authorization: string) {
    try {
      const token = authorization.split(' ')[1];
      const userInfo = await this.jwtService.verify(token);
      return userInfo.userId;
    } catch {
      throw new Error('認証していません。');
    }
  }
}
