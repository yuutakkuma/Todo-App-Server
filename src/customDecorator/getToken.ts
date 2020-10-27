import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const GetToken = createParamDecorator(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (data, [root, args, ctx, info]) => {
    const req: Request = ctx.req
    const authorization = req.headers.authorization ? req.headers.authorization.split(' ') : []
    return authorization[1]
  },
);
