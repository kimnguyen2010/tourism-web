export type ChatRole = "assistant" | "user";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type SendChatResponse = {
  data?: {
    sendChat: {
      reply: string;
    };
  };
  errors?: Array<{
    message: string;
  }>;
};
