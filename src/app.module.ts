import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
    TodoModule,
    UserModule,
  ],
})
export class AppModule {}
