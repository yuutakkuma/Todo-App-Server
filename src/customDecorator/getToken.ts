import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const GetToken = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    const req: Request = ctx.req;
    const token = req.cookies.jid;

    return token;
  },
);
