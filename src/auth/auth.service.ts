import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  // アクセストークンを生成
  async createAccessToken(id: number, email: string) {
    const accessToken = this.jwtService.sign({
      userId: id,
      userEmail: email,
    });
    if (typeof accessToken === 'undefined') {
      throw new UnauthorizedException(
        'アクセストークンを生成出来ませんでした。',
      );
    }
    return accessToken;
  }

  // アクセストークンをCookieに保存する
  async saveAccessToken(res: Response, token: string) {
    try {
      res.cookie('jid', token);
      return true;
    } catch {
      throw new UnauthorizedException(
        'アクセストークンを保存出来ませんでした。',
      );
    }
  }
  // アクセストークンを削除する
  async clearCookiesToken(res: Response, token: string) {
    try {
      res.setHeader('cookie', '');
      // res.clearCookie('jid', token);
    } catch {
      throw new UnauthorizedException('Cookieを削除出来ませんでした。');
    }
  }

  // トークンを検証
  async verify(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('再度ログインしてください。');
    }
  }
}
