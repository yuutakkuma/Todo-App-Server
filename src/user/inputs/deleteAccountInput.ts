import { InputType, Field } from 'type-graphql';

@InputType()
export class DeleteAccountInput {
  @Field()
  nickName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
