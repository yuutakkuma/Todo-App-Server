import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { TodoService } from './todo.service';
import { CreateTodoInput } from './inputs/createTodoInput';
import { Todo } from './entity/todo.entity';
import { GetToken } from '../customDecorator/getToken';
import { TodoDto } from './dto/todo.dto';
import { AuthService } from 'src/auth/auth.service';

@Resolver('Todo')
export class TodoResolver {
  constructor(
    private readonly todoService: TodoService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => TodoDto)
  async getTodoList(@GetToken() token: string) {
    const payload = await this.authService.verify(token);
    return await this.todoService.todoList(payload);
  }

  @Mutation(() => Boolean)
  async createTodo(
    @Args('input') input: CreateTodoInput,
    @GetToken() token: string,
  ) {
    const payload = await this.authService.verify(token);
    return await this.todoService.create(input, payload);
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Args('id') id: number) {
    return await this.todoService.delete(id);
  }
}
