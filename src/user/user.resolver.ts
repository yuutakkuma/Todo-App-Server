import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { hash } from 'bcryptjs';
import { UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { RegisterInput } from './inputs/registerInput';
import { LoginGuard } from '../auth/loginGuard';
import { MyContext } from './myContext';
import { GetToken } from '../customDecorator/getToken';
import { AuthService } from '../auth/auth.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => [UserDto])
  async getUsers() {
    return await this.userService.users();
  }

  @Query(() => UserDto)
  async me(@GetToken() token: string) {
    const payload = await this.authService.verify(token);
    return await this.userService.me(payload);
  }

  @Mutation(() => Boolean)
  async register(@Args('registerInput') registerInput: RegisterInput) {
    return await this.userService.register(registerInput);
  }

  @Mutation(() => Boolean)
  async logOut(@Context() ctx: MyContext, @GetToken() token: string) {
    const payload = await this.authService.verify(token);
    await this.authService.clearCookiesToken(ctx.res, token);
    return await this.userService.loginStutasFalse(payload);
  }

  @Mutation(() => Boolean)
  @UseGuards(LoginGuard)
  async login(): Promise<boolean> {
    return true;
  }
}
