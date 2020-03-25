import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Response } from 'express';

import { User } from '../user/entity/user.entity';
import { LoginInput } from '../user/inputs/loginInput';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  // ユーザー検証
  async validateUser(loginData: LoginInput): Promise<boolean> {
    const user = await User.findOne({
      where: { email: loginData.email },
    });
    if (typeof user === 'undefined') {
      throw new UnauthorizedException('ユーザーが見つかりませんでした。');
    }

    const valid = await compare(loginData.password, user.password);
    if (!valid) {
      throw new UnauthorizedException('パスワードが間違ってます。');
    }

    return true;
  }
  // アクセストークンを生成
  async createAccessToken(user: User) {
    const accessToken = this.jwtService.sign({ userId: user.id });
    if (typeof accessToken === 'undefined') {
      throw new UnauthorizedException(
        'アクセストークンを生成出来ませんでした。',
      );
    }
    return accessToken;
  }
  // アクセストークンをCookieに保存する
  async saveAccessToken(res: Response, token: string) {
    res.cookie('jid', token);
  }
  // アクセストークンを削除する
  async clearCookiesToken(res: Response, token: string) {
    try {
      res.clearCookie('jid', token);
    } catch {
      throw new UnauthorizedException('Cookieを削除出来ませんでした。');
    }
  }

  // ユーザーIDを特定
  async verifyOfUserId(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('再度ログインしてください。');
    }
  }
  // トークンが有効か検証する
  async payload(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch {
      console.error('トークンが無効です。');
    }
  }
}
