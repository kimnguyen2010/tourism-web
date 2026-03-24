import { Injectable } from "@nestjs/common";
import { GoogleGenAI } from "@google/genai";
import { MessageInput } from "./dto/message.input.js";

const systemInstruction = `
Ban la tro ly du lich cho du an tourism.
- Tra loi bang tieng Viet ro rang, than thien, ngan gon.
- Neu nguoi dung hoi ve goi y lich trinh, hay dua de xuat co cau truc.
- Neu thieu thong tin, hay hoi lai toi da 2 cau de lam ro.
`.trim();

@Injectable()
export class ChatService {
  async sendChat(message: string, history: MessageInput[] = []) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Thieu GEMINI_API_KEY trong bien moi truong.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const contents = history
      .filter((item) => item?.role && item?.content)
      .map((item) => ({
        role: item.role === "assistant" ? "model" : "user",
        parts: [{ text: item.content }]
      }));

    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      config: { systemInstruction },
      contents
    });

    return {
      reply: response.text?.trim() || "Xin loi, toi chua tao duoc cau tra loi."
    };
  }
}
