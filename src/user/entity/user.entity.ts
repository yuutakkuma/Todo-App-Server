import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

let isSynchronize = false;
// テスト時はDBと同期させる
if (process.env.NODE_ENV === 'test') isSynchronize = true;

@Entity({ name: 'users', synchronize: isSynchronize })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  nickname: string;

  @Column('text', { unique: true, nullable: false })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column({ default: false })
  loginstatus: boolean;
}
