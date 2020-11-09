import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

@Controller('refresh_token')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post()
  async postToken(@Req() req: Request, @Res() res: Response) {
    //　トークンを取得
    const token = req.headers.authorization;

    if (typeof token === 'undefined') {
      return res.status(404).send({ accessToken: 'no token' });
    }

    // トークンが有効か検証
    const payload = await this.authService.verify(token.split(' ')[1]);
    if (typeof payload === 'undefined') {
      return res.status(404).send({ accessToken: 'no token' });
    }
    // ユーザーを特定し、新しいアクセストークンを生成
    const user = await this.userService.me(payload);
    const newAccessToken = await this.authService.createAccessToken(
      user.id,
      user.email,
    );
    // Cookieに新しいトークンを送る
    res.setHeader('cookie', newAccessToken);
    res.send();
  }
}
