import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';
import { CreateTodoInput } from './inputs/createTodoInput';
import { Todo } from './entity/todo.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/user/auth/gqlAuthGuard';
import { GetAuthorization } from 'src/ customDecorator/getAuthorization';

@Resolver('Todo')
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [TodoDto])
  async getTodoList() {
    return await this.todoService.todoList();
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async createTodo(
    @Args('input') input: CreateTodoInput,
    @GetAuthorization() authorization: string,
  ) {
    await this.todoService.create(input, authorization);
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
