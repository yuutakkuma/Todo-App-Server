import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './inputs/createTodoInput';
import { JwtPayload } from '../models/jwtPayload';
import { TypeOrmConfigService } from '../../config/typeOrmConfig.service';

let todoService: TodoService;
let createTodoInput: CreateTodoInput;
let moduleRef: TestingModule;

const payload: JwtPayload = {
  userId: 1,
  userEmail: 'sasaki@sasaki.com',
};

beforeAll(async () => {
  const todo = {
    title: 'ランニングする',
  };
  createTodoInput = {
    title: todo.title,
  };
  moduleRef = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useClass: TypeOrmConfigService,
      }),
      TypeOrmModule.forFeature([Todo]),
    ],
    providers: [TodoService],
  }).compile();
  todoService = await moduleRef.resolve<TodoService>(TodoService);
});

afterAll(async () => {
  await moduleRef.close();
});

describe('TodoService', () => {
  test('Todo作成', async () => {
    const todo = await todoService.create(createTodoInput, payload);
    expect(todo).toBe(true);
  });
  test('Todoリストを取得', async () => {
    const todoList = await todoService.todoList(payload);
    // console.log(todoList);
    expect(todoList).toMatchObject(todoList);
  });
  test('Todoリストの取得に失敗', async () => {
    const todoList = await todoService.todoList({
      userId: 2,
      userEmail: 'noemail@no.com',
    });
    expect(todoList).toMatchObject([]);
  });
  test('Todoを削除', async () => {
    const deleteTodo = await todoService.delete(1);
    expect(deleteTodo).toBe(true);
  });
});
