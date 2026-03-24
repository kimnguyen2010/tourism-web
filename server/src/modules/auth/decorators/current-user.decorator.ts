import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import type { GraphqlContext } from "../types/graphql-context.type.js";

export const CurrentUser = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(context).getContext<GraphqlContext>();
  return gqlContext.currentUser;
});
