import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Todo } from 'src/todo/entity/todo.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(
    () => Todo,
    todo => todo.user,
  )
  todos: Todo[];
}
