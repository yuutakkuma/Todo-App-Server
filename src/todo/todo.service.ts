import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './inputs/createTodoInput';
import { AuthService } from 'src/user/auth/auth.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly userRepository: Repository<Todo>,
    private readonly authService: AuthService,
  ) {}

  async todoList(authorization: string): Promise<Todo[]> {
    const userId = await this.authService.verifyOfUserId(authorization);
    return await this.userRepository.find({ skip: userId });
  }

  async create(data: CreateTodoInput, authorization: string): Promise<boolean> {
    const userId = await this.authService.verifyOfUserId(authorization);

    try {
      await this.userRepository
        .create({
          title: data.title,
          userId: userId,
        })
        .save();
      return true;
    } catch {
      console.log('データを保存出来ませんでした。');
      return false;
    }
  }

  async delete<T>(data: T) {
    await this.userRepository.delete(data);
  }
}
