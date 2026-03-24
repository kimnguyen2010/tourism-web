import path from "node:path";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { AppController } from "./app.controller.js";
import { AuthModule } from "./modules/auth/auth.module.js";
import { AuthService } from "./modules/auth/auth.service.js";
import type { GraphqlContext } from "./modules/auth/types/graphql-context.type.js";
import { ChatModule } from "./modules/chat/chat.module.js";
import { PrismaModule } from "./prisma/prisma.module.js";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ChatModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [AuthService],
      useFactory: (authService: AuthService) => ({
        autoSchemaFile: path.join(process.cwd(), "src/schema.gql"),
        sortSchema: true,
        playground: true,
        context: async ({ req }: { req: { headers: Record<string, string | string[] | undefined> } }): Promise<GraphqlContext> => {
          const authHeader = Array.isArray(req.headers.authorization) ? req.headers.authorization[0] ?? "" : req.headers.authorization ?? "";
          const currentUser = await authService.getCurrentUser(authHeader);

          return {
            req,
            authHeader,
            currentUser
          };
        }
      })
    })
  ],
  controllers: [AppController]
})
export class AppModule {}
