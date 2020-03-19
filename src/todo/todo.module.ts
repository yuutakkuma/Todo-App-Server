import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { Todo } from './entity/todo.entity';
import { AuthModule } from 'src/user/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), AuthModule],
  providers: [TodoService, TodoResolver],
})
export class TodoModule {}
