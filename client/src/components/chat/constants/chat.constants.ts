import type { ChatMessage } from "../types/chat.types";

export const CHATBOT_API_URL = import.meta.env.VITE_GRAPHQL_URL || "http://localhost:4000/graphql";

export const CHATBOT_MUTATION = `
  mutation SendChat($message: String!, $history: [MessageInput!]) {
    sendChat(message: $message, history: $history) {
      reply
    }
  }
`;

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: "assistant",
    content: "Xin chào, mình là trợ lý du lịch. Bạn muốn mình gợi ý lịch trình, điểm đến hay chi phí?"
  }
];

export const QUICK_SUGGESTIONS = [
  "Gợi ý lịch trình Đà Nẵng 3 ngày 2 đêm",
  "Đi Phú Quốc 2 người hết bao nhiêu?",
  "Nên đi Sapa mùa nào đẹp?"
] as const;

