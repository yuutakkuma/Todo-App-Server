import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    // GraphQLからContextを取得
    const ctx = GqlExecutionContext.create(context);
    // LoginInputの値を取得し、DBに保存されている値と一致するか検証
    const loginData = ctx.getArgs().loginInput;
    await this.authService.validateUser(loginData);

    return true;
  }
}
