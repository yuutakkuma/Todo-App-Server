import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    // GraphQLからContextを取得
    const ctx = GqlExecutionContext.create(context);
    const res: Response = ctx.getContext().res;
    // LoginInputの値を取得し、DBに保存されている値と一致するか検証
    const loginData = ctx.getArgs().loginInput;
    const user = await this.userService.validateUser(loginData);
    // アクセストークンを生成し、ログインステータスをtrueにしてから保存
    const accessToken = await this.authService.createAccessToken(user);
    await this.userService.loginStutasTrue(user);
    return await this.authService.saveAccessToken(res, accessToken);
  }
}
