import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { Todo } from './entity/todo.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), AuthModule],
  providers: [TodoService, TodoResolver],
  exports: [TodoService],
})
export class TodoModule {}
