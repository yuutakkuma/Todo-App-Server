import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickName: string;

  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  loginStatus: boolean;
}
