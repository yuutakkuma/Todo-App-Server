import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const GetAuthorization = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    const req: Request = ctx.req;
    const authorization = req.headers['authorization'];

    return authorization;
  },
);
