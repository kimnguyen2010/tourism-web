import { Module } from "@nestjs/common";
import { ChatResolver } from "./chat.resolver.js";
import { ChatService } from "./chat.service.js";

@Module({
  providers: [ChatResolver, ChatService]
})
export class ChatModule {}
