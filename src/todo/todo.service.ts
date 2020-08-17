import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './inputs/createTodoInput';
import { JwtPayload } from '../models/jwtPayload';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async todoList(payload: JwtPayload): Promise<Todo[]> {
    return await this.todoRepository.find({
      where: { userId: payload.userId },
    });
  }
  // 開発用
  async allTodoList() {
    return await this.todoRepository.find();
  }

  async create(input: CreateTodoInput, payload: JwtPayload): Promise<boolean> {
    try {
      await this.todoRepository
        .create({
          title: input.title,
          userId: payload.userId,
        })
        .save();
      return true;
    } catch {
      throw new UnauthorizedException('データを保存出来ませんでした。');
    }
  }

  async delete(todoId: number) {
    const todo = await this.todoRepository.findOne({ where: { id: todoId } });
    if (typeof todo === 'undefined') {
      throw new UnauthorizedException('Todoがありませんでした。');
    }
    try {
      await this.todoRepository.delete(todo);
      return true;
    } catch {
      throw new UnauthorizedException('削除に失敗しました。');
    }
  }

  async todoAllDelete(payload: JwtPayload) {
    try {
      const allTodo = await this.todoRepository.find({
        where: { userId: payload.userId },
      });
      await this.todoRepository.remove(allTodo);
    } catch {
      throw new UnauthorizedException('TodoListの削除に失敗しました。');
    }
  }
}
