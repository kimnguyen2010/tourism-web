import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ChatService } from "./chat.service.js";
import { MessageInput } from "./dto/message.input.js";
import { ChatResponseModel } from "./models/chat-response.model.js";

@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => ChatResponseModel)
  sendChat(
    @Args("message", { type: () => String }) message: string,
    @Args("history", { type: () => [MessageInput], nullable: true }) history?: MessageInput[]
  ) {
    return this.chatService.sendChat(message, history ?? []);
  }
}
