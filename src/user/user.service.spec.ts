import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';
import { RegisterInput } from './inputs/registerInput';
import { LoginInput } from './inputs/loginInput';
import { User } from './entity/user.entity';

let userService: UserService;
let registerInput: RegisterInput;
let loginInput: LoginInput;
let moduleRef: TestingModule;
const meData = {
  userId: 1,
  userEmail: 'sasaki@sasaki.com',
};

beforeAll(async () => {
  const user = {
    name: '佐々木小次郎',
    email: 'sasaki@sasaki.com',
    password: 'test',
  };
  registerInput = {
    userName: user.name,
    email: user.email,
    password: user.password,
  };
  loginInput = {
    email: user.email,
    password: user.password,
  };
  moduleRef = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'postgres',
        database: 'todo-app-test',
        synchronize: true,
        dropSchema: true,
        entities: [__dirname, '**/*.entity.ts'],
      }),
      TypeOrmModule.forFeature([User]),
    ],
    providers: [UserService],
  }).compile();
  userService = await moduleRef.resolve<UserService>(UserService);
});

afterAll(async () => {
  await moduleRef.close();
});

describe('UserService', () => {
  test('ユーザー情報を保存', async () => {
    const register = await userService.register(registerInput);
    expect(register).toBe(true);
  });
  test('ユーザー情報の保存に失敗', async () => {
    const newRegister = await userService.register(registerInput);
    expect(newRegister).toBeFalsy();
  });
  test('ユーザー検証に成功し、ログインステータスをtrueに更新', async () => {
    const user = await userService.validateUser(loginInput);
    expect(user).toMatchObject(user);
    await userService.loginStutasTrue(user);
    const beenUpdatedUser = await userService.validateUser(loginInput);
    // console.log(beenUpdatedUser);
    expect(beenUpdatedUser.loginStatus).toBe(true);
  });
  test('自身のユーザー情報を取得', async () => {
    const users = await userService.me(meData);
    // console.log(users);
    expect(users).toMatchObject(users);
  });
  test('自身のユーザー情報の取得に失敗', async () => {
    const users = await userService.me({
      userId: 2,
      userEmail: 'sasaki@sasaki.com',
    });
    expect(users).not.toBeDefined();
  });
});
