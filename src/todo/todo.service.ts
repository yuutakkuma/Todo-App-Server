import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './inputs/createTodoInput';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly userRepository: Repository<Todo>,
  ) {}

  async todoList(): Promise<Todo[]> {
    return await this.userRepository.find();
  }

  async create(title: CreateTodoInput): Promise<Todo> {
    const data = this.userRepository.create(title).save();
    return data;
  }
}
