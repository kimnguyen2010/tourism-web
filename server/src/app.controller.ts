import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      name: "tourism-chatbot-server",
      framework: "nestjs",
      graphql: "/graphql",
      auth: ["register", "login", "logout", "me"],
      orm: "prisma"
    };
  }
}
