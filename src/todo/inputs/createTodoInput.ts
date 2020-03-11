import { InputType, Field } from 'type-graphql';

type input = { title: string };

@InputType()
export class CreateTodoInput implements input {
  @Field()
  title: string;
}
