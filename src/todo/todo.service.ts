import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './inputs/createTodoInput';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    private readonly authService: AuthService,
  ) {}

  async todoList(token: string): Promise<Todo[]> {
    const data = await this.authService.verifyOfUserId(token);

    return await this.todoRepository.find({
      where: { userId: data.userId },
    });
  }

  async create(data: CreateTodoInput, authorization: string): Promise<boolean> {
    const userId = await this.authService.verifyOfUserId(authorization);

    try {
      await this.todoRepository
        .create({
          title: data.title,
          userId: userId,
        })
        .save();
      return true;
    } catch {
      console.error('データを保存出来ませんでした。');
      return false;
    }
  }

  async delete<T>(data: T) {
    await this.todoRepository.delete(data);
  }
}
