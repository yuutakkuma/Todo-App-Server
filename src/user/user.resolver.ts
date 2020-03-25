import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { hash } from 'bcryptjs';
import { UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { RegisterInput } from './inputs/registerInput';
import { LoginInput } from './inputs/loginInput';
import { LoginGuard } from '../auth/loginGuard';
import { MyContext } from './myContext';
import { GetToken } from '../customDecorator/getToken';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserDto])
  async getUsers() {
    return await this.userService.users();
  }

  @Query(() => UserDto)
  async me(@GetToken() token: string) {
    return await this.userService.me(token);
  }

  @Mutation(() => Boolean)
  async register(@Args('registerInput') registerInput: RegisterInput) {
    registerInput.password = await hash(registerInput.password, 12);
    return await this.userService.register(registerInput);
  }

  @Mutation(() => Boolean)
  async logOut(@Context() ctx: MyContext, @GetToken() token: string) {
    await this.userService.logOut(ctx, token);
    return true;
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
