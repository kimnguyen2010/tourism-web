import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import type { GraphqlContext } from "../types/graphql-context.type.js";

@Injectable()
export class GqlAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context).getContext<GraphqlContext>();

    if (!gqlContext.currentUser) {
      throw new UnauthorizedException("Ban can dang nhap de su dung tinh nang nay.");
    }

    return true;
  }
}
