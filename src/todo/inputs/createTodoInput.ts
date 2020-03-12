import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';

type input = { title: string };

@InputType()
export class CreateTodoInput implements input {
  // 30文字まで
  @MaxLength(30)
  @Field()
  title: string;
}
