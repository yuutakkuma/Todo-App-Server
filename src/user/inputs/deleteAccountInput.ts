import { InputType, Field } from 'type-graphql';

@InputType()
export class DeleteAccountInput {
  @Field()
  nickname: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
