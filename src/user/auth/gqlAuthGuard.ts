import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

import { AuthService } from './auth.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req: Request = await ctx.getContext().req;
    // bearer acceccToken
    const authorization = req.headers['authorization'];
    if (!authorization) {
      throw new Error('認証していません。');
    }
    // 検証
    await this.authService.verify(authorization);
    return true;
  }
}
