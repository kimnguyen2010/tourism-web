import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "./decorators/current-user.decorator.js";
import { LoginInput } from "./dto/login.input.js";
import { RegisterInput } from "./dto/register.input.js";
import { GqlAuthGuard } from "./guards/gql-auth.guard.js";
import { AuthPayloadModel } from "./models/auth-payload.model.js";
import { UserModel } from "./models/user.model.js";
import type { GraphqlContext } from "./types/graphql-context.type.js";
import { AuthService } from "./auth.service.js";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  health() {
    return "ok";
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserModel)
  me(@CurrentUser() currentUser: UserModel) {
    return currentUser;
  }

  @Mutation(() => AuthPayloadModel)
  register(@Args("input", { type: () => RegisterInput }) input: RegisterInput) {
    return this.authService.register(input);
  }

  @Mutation(() => AuthPayloadModel)
  login(@Args("input", { type: () => LoginInput }) input: LoginInput) {
    return this.authService.login(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  logout(@Context() context: GraphqlContext) {
    return this.authService.logout(context.authHeader);
  }
}
