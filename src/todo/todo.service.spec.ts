import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './inputs/createTodoInput';
import { JwtPayload } from 'src/models/jwtPayload';

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
