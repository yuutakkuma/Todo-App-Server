import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { RegisterUserInput } from './inputs/registerUserInput';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserDto])
  async getUsers() {
    return await this.userService.users();
  }

  @Mutation(() => UserDto)
  async registerUser(@Args('input') input: RegisterUserInput) {
    return await this.userService.registerUser(input);
  }
}
