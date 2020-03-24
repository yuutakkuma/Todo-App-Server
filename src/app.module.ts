import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req, res }) => ({ req, res }),
      cors: false,
    }),
    TodoModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
