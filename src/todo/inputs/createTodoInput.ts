import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  // 30文字まで
  @MaxLength(30)
  @Field()
  title: string;
}
