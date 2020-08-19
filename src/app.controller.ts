import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth/auth.service';
import { User } from './user/entity/user.entity';
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
    const token = req.cookies.jid;
    if (typeof token === 'undefined') {
      return res.status(404).send({ accessToken: 'no token' });
    }

    // トークンが有効か検証
    const payload = await this.authService.verify(token);
    if (typeof payload === 'undefined') {
      return res.status(404).send({ accessToken: 'no token' });
    }

    // ユーザーを特定し、新しいアクセストークンを生成
    const user = await this.userService.me(payload);
    const newAccessToken = await this.authService.createAccessToken(user);

    // Cookieに新しいトークンを送る
    await this.authService.saveAccessToken(res, newAccessToken);
    res.send();
  }
}
