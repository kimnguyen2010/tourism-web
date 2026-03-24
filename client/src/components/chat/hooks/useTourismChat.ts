import { useMemo, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { graphqlRequest } from "../../../lib/graphql";
import { CHATBOT_MUTATION, INITIAL_MESSAGES } from "../constants/chat.constants";
import type { ChatMessage } from "../types/chat.types";

type UseTourismChatResult = {
  messages: ChatMessage[];
  input: string;
  loading: boolean;
  error: string;
  setInput: (value: string) => void;
  submitMessage: (message: string) => Promise<void>;
};

export function useTourismChat(): UseTourismChatResult {
  const { token } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const history = useMemo(() => messages, [messages]);

  async function submitMessage(message: string): Promise<void> {
    const trimmed = message.trim();
    if (!trimmed || loading) return;

    const previousMessages = messages;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const payload = await graphqlRequest<{ sendChat: { reply: string } }, { message: string; history: ChatMessage[] }>({
        query: CHATBOT_MUTATION,
        variables: {
          message: trimmed,
          history
        },
        token
      });

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: payload.sendChat.reply
        }
      ]);
    } catch (submitError) {
      setMessages(previousMessages);
      setError(submitError instanceof Error ? submitError.message : "Có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    input,
    loading,
    error,
    setInput,
    submitMessage
  };
}
