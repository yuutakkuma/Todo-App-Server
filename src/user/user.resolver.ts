import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { RegisterInput } from './inputs/registerInput';
import { LoginGuard } from '../auth/loginGuard';
import { MyContext } from './myContext';
import { GetToken } from '../customDecorator/getToken';
import { AuthService } from '../auth/auth.service';
import { DeleteAccountInput } from './inputs/deleteAccountInput';
import { TodoService } from '../todo/todo.service';
import { LoginInput } from './inputs/loginInput';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly todoService: TodoService,
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

  @Query(() => String)
  async helloNestJS() {
    return 'Hello, NestJS!!!';
  }

  @Mutation(() => Boolean)
  async register(
    @Args('registerInput') { nickname, email, password }: RegisterInput,
  ) {
    return await this.userService.saveRegister(nickname, email, password);
  }

  @Mutation(() => Boolean)
  async deleteAccount(
    @GetToken() token: string,
    @Args('deleteAccountInput')
    { nickname, email, password }: DeleteAccountInput,
    @Context() ctx: MyContext,
  ) {
    // Cookieからユーザー情報を取得
    const payload = await this.authService.verify(token);
    const data = await this.userService.me(payload);
    // TodoListを削除
    await this.todoService.todoAllDelete(payload);
    // ユーザーを削除
    await this.userService.executeDelete(nickname, email, password, data);
    // Cookieを削除
    await this.authService.clearCookiesToken(ctx.res, token);
    return true;
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

  // テストユーザーログイン専用クエリ
  @Mutation(() => Boolean)
  async testUserLogin(
    @Args('loginInput') { email, password }: LoginInput,
    @Context() ctx: MyContext,
  ) {
    const testUser = await this.userService.validateTestUser(email, password);
    // アクセストークン生成
    const accessToken = await this.authService.createAccessToken(testUser);
    // ログインステータス更新
    await this.userService.loginStutasTrue(testUser);
    // アクセストークンをCookieに保存
    return await this.authService.saveAccessToken(ctx.res, accessToken);
  }
}
