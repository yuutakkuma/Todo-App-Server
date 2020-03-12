import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';
import { CreateTodoInput } from './inputs/createTodoInput';
import { Todo } from './entity/todo.entity';

@Resolver('Todo')
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [TodoDto])
  async getTodoList() {
    return await this.todoService.todoList();
  }

  @Mutation(() => TodoDto)
  async createTodo(@Args('input') input: CreateTodoInput) {
    return await this.todoService.create(input);
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
