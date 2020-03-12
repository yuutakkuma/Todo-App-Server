import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  userName: string;
  // 列タイプをtextとし、一意であることをtrueにする
  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;
}
