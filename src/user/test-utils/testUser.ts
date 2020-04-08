import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
// テスト用
@Entity({ name: 'testusers', synchronize: true })
export class TestUser extends BaseEntity {
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
