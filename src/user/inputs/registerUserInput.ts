import { Length, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class RegisterUserInput {
  @Field()
  @Length(1, 30)
  userName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
