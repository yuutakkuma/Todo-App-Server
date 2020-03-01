import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';
import { CreateTodoInput } from './inputs/createTodoInput';

@Resolver('Todo')
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}
  // 全ユーザー取得
  @Query(() => [TodoDto])
  async getTodoList() {
    return this.todoService.todoList();
  }

  @Mutation(() => TodoDto)
  async createTodo(@Args('input') input: CreateTodoInput) {
    return this.todoService.create(input);
  }
}
