import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { TodoService } from './todo.service';
import { CreateTodoInput } from './inputs/createTodoInput';
import { Todo } from './entity/todo.entity';
import { GetAuthorization } from 'src/customDecorator/getAuthorization';
import { GetToken } from '../customDecorator/getToken';

@Resolver('Todo')
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => Todo)
  async getTodoList(@GetToken() token: string) {
    return await this.todoService.todoList(token);
  }

  @Mutation(() => Boolean)
  async createTodo(
    @Args('input') input: CreateTodoInput,
    @GetAuthorization() authorization: string,
  ) {
    const save = await this.todoService.create(input, authorization);
    if (!save) {
      throw new Error('データをセーブ出来ませんでした。');
    }
    return true;
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Args('id') id: number) {
    const data = await Todo.findOne({ where: { id } });
    if (!data) {
      return false;
    }
    await this.todoService.delete(data);
    return true;
  }
}
