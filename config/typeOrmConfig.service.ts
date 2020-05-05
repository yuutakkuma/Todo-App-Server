import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../src/user/entity/user.entity';
import { Todo } from '../src/todo/entity/todo.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  // DBの接続設定
  createTypeOrmOptions(): TypeOrmModuleOptions {
    // 開発用
    if (process.env.NODE_ENV === 'dev') {
      return {
        type: 'postgres',
        host: this.configService.get('TYPEORM_HOST'),
        port: Number(this.configService.get('TYPEORM_PORT')),
        username: this.configService.get('TYPEORM_USERNAME'),
        password: this.configService.get('TYPEORM_PASSWORD'),
        database: this.configService.get('TYPEORM_DATABASE'),
        entities: [User, Todo],
        synchronize: true,
      };
    }
    // テスト用
    if (process.env.NODE_ENV === 'test') {
      return {
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'test',
        password: 'test',
        database: 'todo-app-test',
        entities: [User, Todo],
        synchronize: true,
        dropSchema: true,
      };
    }
    // Herokuへのデプロイ用
    return {
      type: 'postgres',
      url: this.configService.get('DATABASE_URL'),
      entities: [__dirname + '../../**/**/*.entity.js'],
      synchronize: true,
    };
  }
}
