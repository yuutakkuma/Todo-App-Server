import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Length(1, 25, { message: '1文字以上、25文字以下になります。' })
  @Field()
  title: string;
}
