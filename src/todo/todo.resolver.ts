import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { TodoService } from './todo.service';
import { CreateTodoInput } from './inputs/createTodoInput';
import { Todo } from './entity/todo.entity';
import { GetToken } from '../customDecorator/getToken';
import { TodoDto } from './dto/todo.dto';

@Resolver('Todo')
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => TodoDto)
  async getTodoList(@GetToken() token: string) {
    return await this.todoService.todoList(token);
  }

  @Mutation(() => Boolean)
  async createTodo(
    @Args('input') input: CreateTodoInput,
    @GetToken() token: string,
  ) {
    await this.todoService.create(input, token);
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
