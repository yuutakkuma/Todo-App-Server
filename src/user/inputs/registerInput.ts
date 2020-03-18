import { Length, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 30)
  userName: string;

  @Field()
  @IsEmail()
  email: string;

  password: string;
}
