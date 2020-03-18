import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { hash } from 'bcryptjs';
import { UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { RegisterInput } from './inputs/registerInput';
import { LoginInput } from './inputs/loginInput';
import { LoginGuard } from './auth/loginGuard';
import { GqlAuthGuard } from './auth/gqlAuthGuard';
import { MyContext } from './myContext';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserDto])
  async getUsers() {
    return await this.userService.users();
  }
  // jwtで認証できるか実験
  @Query(() => String)
  @UseGuards(GqlAuthGuard)
  async bye() {
    return '認証済みです！';
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
    await this.userService.login(loginInput, ctx);
    return true;
  }
}
