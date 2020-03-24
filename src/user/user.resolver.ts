import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { hash } from 'bcryptjs';
import { UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { RegisterInput } from './inputs/registerInput';
import { LoginInput } from './inputs/loginInput';
import { LoginGuard } from '../auth/loginGuard';
import { MyContext } from './myContext';
import { AuthService } from '../auth/auth.service';
import { GetToken } from '../customDecorator/getToken';

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

  @Mutation(() => Boolean)
  async logOut(@Context() ctx: MyContext, @GetToken() token: string) {
    await this.authService.clearCookiesToken(ctx.res, token);
    return true;
  }

  @Mutation(() => Boolean)
  async register(@Args('registerInput') registerInput: RegisterInput) {
    registerInput.password = await hash(registerInput.password, 12);
    return await this.userService.register(registerInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(LoginGuard)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() ctx: MyContext,
  ): Promise<boolean> {
    return await this.userService.login(loginInput, ctx);
  }
}
