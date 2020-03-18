import { InputType, Field } from 'type-graphql';
import { User } from '../entity/user.entity';

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  email: string;

  password: string;
}
