import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './inputs/createTodoInput';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly userRepository: Repository<Todo>,
  ) {}

  async todoList(): Promise<Todo[]> {
    return await this.userRepository.find();
  }

  async create(title: CreateTodoInput): Promise<Todo> {
    // 受け取った値をコピーし、saveメソッドでDBに値を作成か更新をする処理を行う。
    // (IDをDBで自動生成しているので、更新はされない。)
    return await this.userRepository.create(title).save();
  }

  async delete<T>(data: T) {
    await this.userRepository.delete(data);
  }
}
