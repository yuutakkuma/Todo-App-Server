import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
    TodoModule,
  ],
})
export class AppModule {}
