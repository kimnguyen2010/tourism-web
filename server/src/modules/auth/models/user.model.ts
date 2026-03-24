import { registerEnumType, Field, ID, ObjectType } from "@nestjs/graphql";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN"
}

registerEnumType(UserRole, {
  name: "UserRole"
});

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field(() => UserRole)
  role!: UserRole;

  @Field()
  createdAt!: string;
}
