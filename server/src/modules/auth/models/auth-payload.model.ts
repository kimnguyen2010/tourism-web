import { Field, ObjectType } from "@nestjs/graphql";
import { UserModel } from "./user.model.js";

@ObjectType()
export class AuthPayloadModel {
  @Field()
  token!: string;

  @Field(() => UserModel)
  user!: UserModel;
}
